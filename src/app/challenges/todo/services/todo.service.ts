import { TodoStateEnum } from '../enums/filter-options.enum';
import { Todo } from '../todo';
import { effect, Injectable, signal, Signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private todosSignal = signal<Todo[]>([]);

    constructor() {
        const todos = localStorage.getItem('todos');

        if (todos) {
            this.todosSignal.set(JSON.parse(todos) as Todo[]);
        }

        effect(() => {
            localStorage.setItem('todos', JSON.stringify(this.todosSignal()));
        });
    }

    add(todo: Todo): void {
        this.todosSignal.update(todos => [...todos, todo]);
    }

    addFromText(description: string): void {
        this.add({
            id: Math.max(0, ...this.todosSignal().map(todo => todo.id)) + 1,
            description,
            state: TodoStateEnum.Active,
        });
    }

    remove(id: number): void {
        this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
    }

    removeCompleted(): void {
        this.todosSignal.update(todos => todos.filter(todo => todo.state !== TodoStateEnum.Completed));
    }

    switchTodoState(id: number): void {
        this.todosSignal.update(todos =>
            todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        state: todo.state === TodoStateEnum.Active ? TodoStateEnum.Completed : TodoStateEnum.Active,
                    };
                }

                return todo;
            }),
        );
    }

    get todos(): Signal<Todo[]> {
        return this.todosSignal.asReadonly();
    }
}
