import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, SubCategory, TodoItem } from '../../models';
import { Observable, combineLatest } from 'rxjs';
import { CategoryService } from '../../../core/services/category.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

export interface DialogData {
  title: string;
  status: boolean;
}

@Component({
  selector: 'app-edit-dialog-reactive',
  templateUrl: './edit-dialog-reactive.component.html',
  styleUrls: ['./edit-dialog-reactive.component.scss']
})
export class EditDialogReactiveComponent implements OnInit {

  categoryLists$: Observable<{ categories: Category[]; subCategories: SubCategory[]; }>;
  filteredSubcategories: { id: string, name: string, categoryId: string }[] = [];

  editForm: FormGroup;
  categories$: Observable<Category[]>;
  subCategories$: Observable<SubCategory[]>;
  filteredSubCategories$: Observable<SubCategory[]>;

  categoryControl = new FormControl<Category | null>(null, Validators.required);


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogReactiveComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem) {
      this.initializeForm(data);
  }

  ngOnInit(){
   
    this.categories$ = this.categoryService.getCategories(); 
    this.subCategories$ = this.categoryService.getSubCategories();
    
    this.filteredSubCategories$ = this.editForm.get('categoryId').valueChanges
    .pipe(
      startWith(this.editForm.get('categoryId').value),
      switchMap(value => this.filterSubCategories(value))
    );

  }

  private initializeForm(data: TodoItem) {
    this.editForm = this.fb.group({
      id: [{value: '', disabled: true}, Validators.required],
      title: ['', Validators.required],
      status: [''],
      categoryId: [null, Validators.required],
      subCategoriesIds: [[]]
    });

    if (data) {
      this.editForm.patchValue({
        id: data.id,
        title: data.title,
        status: data.status,
        categoryId: data.category.id,
        subCategoriesIds: data.subCategories.map(sc => sc.id)
      });
      
    }

  }

  private filterSubCategories(categoryId: string): Observable<SubCategory[]> {
    return this.subCategories$.pipe(
      map(subCategories => {
        return subCategories.filter(sc => sc.categoryId === categoryId)
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }  

}
