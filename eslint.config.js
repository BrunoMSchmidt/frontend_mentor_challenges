/* eslint-disable import-x/namespace */
/* eslint-disable import-x/default */
/* eslint-disable import-x/no-named-as-default */
/* eslint-disable import-x/no-named-as-default-member */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginPrettierRecomemnded from 'eslint-plugin-prettier/recommended';
import eslintPluginImportX from 'eslint-plugin-import-x';

export default tseslint.config(
    eslintPluginPrettierRecomemnded,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
        files: ['**/*.ts'],
        plugins: {
            'unused-imports': unusedImports,
        },
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            sonarjs.configs.recommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/prefer-on-push-component-change-detection': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'import-x/no-dynamic-require': 'warn',
            'import-x/no-nodejs-modules': 'warn',
            'import-x/order': ['error', { groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'] }],
            // SonarJS
            'sonarjs/unused-import': 'off', // Regra já coberta pelo plugin unused-imports
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: ['./tsconfig.json'],
                },
                node: {
                    extensions: ['.ts'],
                },
            },
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: { 'import-x/namespace': 'off' },
    },
    {
        files: ['**/*.js'],
        ignores: ['eslint.config.js'],
    },
);
