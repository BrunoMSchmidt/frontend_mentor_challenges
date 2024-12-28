import { Component, OnInit } from '@angular/core'
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms'
import { Todo } from './todo'

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    standalone: false
})
export class TodoComponent implements OnInit {
    darkTheme = false

    form: UntypedFormGroup

    private _todos: Todo[] = []
    filteredTodos: Todo[] = []
    private _filter: string = 'all'

    itemsLeft = 0

    public get filter(): string {
        return this._filter
    }

    public set filter(value: string) {
        this._filter = value
        this.filterTodos()
    }

    get fc() {
        return this.form.controls
    }

    constructor(private fb: UntypedFormBuilder) {
        this.form = fb.group({
            todo: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250),
                ],
            ],
        })

        // Seta o tema do dispositivo/sistema para a variavel
        this.darkTheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches
    }

    ngOnInit(): void {
        let todos = localStorage.getItem('todos')
        if (todos) {
            console.log(JSON.parse(todos))
            this._todos = <Todo[]>JSON.parse(todos)
            this.filterTodos()
        }
    }

    switchTheme() {
        console.log('mudando')
        this.darkTheme = !this.darkTheme
    }

    onSubmit() {
        console.log('submitted')
        console.log(this.form, this.fc.todo)
        if (this.fc.todo.valid) {
            let todo: Todo = {
                id:
                    this._todos.length <= 0
                        ? 0
                        : this._todos
                              .map((todo) => todo.id)
                              .reduce((previous, actual) =>
                                  actual > previous ? actual : previous
                              ) + 1,
                description: this.fc.todo.value,
                state: 'active',
            }
            this._todos.push(todo)
            this.saveTodosOnLocalStorage()
            this.filter = 'all'
            this.form.reset()
        }
    }

    saveTodosOnLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this._todos))
    }

    removeTodo(id: number) {
        this._todos.splice(
            this._todos.findIndex((todo) => todo.id === id),
            1
        )
        this.filterTodos()
        this.saveTodosOnLocalStorage()
    }

    changeTodoState(todo: Todo) {
        todo.state = todo.state === 'active' ? 'completed' : 'active'
        this.filterTodos()
        this.saveTodosOnLocalStorage()
    }

    filterTodos() {
        if (this.filter === 'all') {
            this.filteredTodos = this._todos
        } else {
            this.filteredTodos = this._todos.filter(
                (todo) => todo.state === this.filter
            )
        }
        this.itemsLeft = this._todos.filter(
            (todo) => todo.state === 'active'
        ).length
    }

    clearCompleted() {
        this._todos = this._todos.filter((todo) => todo.state !== 'completed')
        this._filter = 'all'
        this.filterTodos()
        this.saveTodosOnLocalStorage()
    }
}
