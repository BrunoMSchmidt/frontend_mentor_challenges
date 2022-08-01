import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColumnsPreviewCardComponent } from './columns-preview-card.component';

const routes = [
  {
    path: '',
    component: ColumnsPreviewCardComponent
  }
]

@NgModule({
  declarations: [
    ColumnsPreviewCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
})
export class ColumnsPreviewCardModule {}
