import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, SubCategory, TodoItem } from '../../models';
import { Observable, combineLatest } from 'rxjs';
import { CategoryService } from '../../../core/services/category.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';



export interface DialogData {
  title: string;
  status: boolean;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  categoryLists$: Observable<{ categories: Category[]; subCategories: SubCategory[]; }>;
  filteredSubcategories: { id: string, name: string, categoryId: string }[] = [];
  localData: TodoItem;
  editForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private categoriesService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem) {
      this.localData = JSON.parse(JSON.stringify(this.data));
  }

  ngOnInit(){
    this.categoryLists$ = combineLatest([
      this.categoriesService.getCategories(),
      this.categoriesService.getSubCategories()
    ]).pipe(map(([categories, subCategories]) => {
        this.filteredSubcategories = subCategories;
        // this.filteredSubcategories = subCategories.filter(sub => sub.categoryId === this.data?.category?.id);
        return {categories, subCategories};
      }
    ));
  }

  initForm() {
    this.editForm = new FormGroup({
      id: new FormControl(this.localData.id, Validators.required),
      title: new FormControl(this.localData.title, Validators.required),

      // Add other controls here
    });
  }

  onCategoryChange(categoryId: string, subCategories: SubCategory[] ) {
    // this.filteredSubcategories = subCategories.filter(sub => sub.categoryId === categoryId);
    // this.localData.subCategories = []; // Reset selected subcategories when category changes
  }

  compareCategories(cat1: Category | SubCategory, cat2: Category | SubCategory): boolean {
    return cat1 && cat2 ? cat1.id === cat2.id : cat1 === cat2;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.localData);
  }  

}
