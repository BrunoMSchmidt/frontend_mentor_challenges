import eslint from '@eslint/js';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginPrettierRecomemnded from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    eslintPluginPrettierRecomemnded,
    importPlugin.flatConfigs.recommended,
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
            'import/no-dynamic-require': 'warn',
            'import/no-nodejs-modules': 'warn',
            'import/order': ['error', { groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'] }],
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
        rules: { 'import/namespace': 'off' },
    },
);
