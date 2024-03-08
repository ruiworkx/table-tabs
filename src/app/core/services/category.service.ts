import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, SubCategory } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CATEGORIES: Category[] = [
    { id: '1', name: 'Business' },
    { id: '2', name: 'Personal' },
    { id: '3', name: 'Others' },
  ];

  SUB_CATEGORIES: SubCategory[] = [
    { id: '1', name: 'Chore', categoryId: '3' },
    { id: '2', name: 'Salary Payments', categoryId: '1' },
    { id: '3', name: 'Bills', categoryId: '3' },
    { id: '4', name: 'Investments', categoryId: '1' },
    { id: '5', name: 'Friends', categoryId: '2' },
    { id: '6', name: 'Fun Activities', categoryId: '2' },
    { id: '7', name: 'Sports', categoryId: '2' },
    { id: '8', name: 'Trainings', categoryId: '2' },
    { id: '9', name: 'Private Projects', categoryId: '2' },
    { id: '10', name: 'Donations and charities', categoryId: '2' },
    { id: '11', name: 'Others', categoryId: '3' },
    { id: '12', name: 'Meetings', categoryId: '1' },
  ];
  
  categoriesSubject$ = new BehaviorSubject(this.CATEGORIES);
  subCategoriesSubject$ = new BehaviorSubject(this.SUB_CATEGORIES);

  get categories() {
    return this.CATEGORIES;
  }

  get subCategories() {
    return this.SUB_CATEGORIES;
  }

  constructor() { }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject$;
  }

  getSubCategories(): Observable<SubCategory[]> {
    return this.subCategoriesSubject$;
  }
}
