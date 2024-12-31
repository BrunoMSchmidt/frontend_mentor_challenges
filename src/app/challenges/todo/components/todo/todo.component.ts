import { Todo } from '../../todo';
import { ThemeService } from '../../services/theme.service';
import { TodoService } from '../../services/todo.service';
import { TodoStateEnum } from '../../enums/filter-options.enum';
import { ChangeDetectionStrategy, Component, Signal, computed, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, NgClass],
})
export class TodoComponent {
    private formBuilder = inject(FormBuilder);
    private themeService = inject(ThemeService);
    private todoService = inject(TodoService);

    isDarkMode: Signal<boolean>;

    form;

    readonly TodoStateEnum = TodoStateEnum;

    private todos: Signal<Todo[]>;

    stateFilter = signal<TodoStateEnum>(TodoStateEnum.All);

    filteredTodos = computed(() =>
        this.todos().filter(todo => this.stateFilter() == TodoStateEnum.All || todo.state === this.stateFilter()),
    );

    itemsLeft = computed(() => this.todos().filter(todo => todo.state === TodoStateEnum.Active).length);

    descricaoValida: Signal<boolean>;

    constructor() {
        this.isDarkMode = this.themeService.isDarkMode;

        this.form = this.formBuilder.group({
            descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
        });

        this.todos = this.todoService.todos;

        this.descricaoValida = toSignal(
            this.form.controls.descricao.statusChanges.pipe(map(status => status === 'VALID')),
            { initialValue: false },
        );
    }

    switchTheme(): void {
        this.themeService.switchTheme();
    }

    onSubmit(): void {
        if (this.form.controls.descricao.valid && this.form.controls.descricao.value) {
            this.todoService.addFromText(this.form.controls.descricao.value);

            this.stateFilter.set(TodoStateEnum.All);
            this.form.reset();
        }
    }

    removeTodo(id: number): void {
        this.todoService.remove(id);
    }

    changeTodoState(id: number): void {
        this.todoService.switchTodoState(id);
    }

    changeStateFilter(state: TodoStateEnum): void {
        this.stateFilter.set(state);
    }

    clearCompleted(): void {
        this.todoService.removeCompleted();

        this.stateFilter.set(TodoStateEnum.All);
    }
}
