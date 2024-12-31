import { TodoStateEnum } from './enums/filter-options.enum';

export interface Todo {
    id: number;
    description: string;
    state: TodoStateEnum;
}
