import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BwtTabComponent } from './components/bwt-tab/bwt-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SubCategoryNamesPipe } from './pipes/sub-category-names/sub-category-names.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogReactiveComponent } from './components/edit-dialog-reactive/edit-dialog-reactive.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    BwtTabComponent,
    SubCategoryNamesPipe,
    ConfirmDialogComponent,
    EditDialogComponent,
    EditDialogReactiveComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BwtTabComponent,
    SubCategoryNamesPipe,
    ConfirmDialogComponent,
    EditDialogComponent,
    EditDialogReactiveComponent
  ]
})
export class SharedModule { }
