import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TodoComponent
  }
]

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
})
export class TodoModule {}
