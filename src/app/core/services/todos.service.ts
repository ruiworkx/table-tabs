import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItemRaw } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private TODOS: TodoItemRaw[] = [
    { id: '1', title: 'title 1', categoryId: '1', subCategoriesIds: ['1'], status: false },
    { id: '2', title: 'title 2', categoryId: '2', subCategoriesIds: ['5', '6'], status: false },
    { id: '3', title: 'title 3', categoryId: '2', subCategoriesIds: ['9'], status: false },
    { id: '4', title: 'title 4', categoryId: '1', subCategoriesIds: ['1'], status: false },
    { id: '5', title: 'title 5', categoryId: '2', subCategoriesIds: ['6'], status: false },
    { id: '6', title: 'title 6', categoryId: '3', subCategoriesIds: ['10'], status: false },
    { id: '7', title: 'title 7', categoryId: '1', subCategoriesIds: ['2'], status: false },
    { id: '8', title: 'title 8', categoryId: '2', subCategoriesIds: ['7', '8'], status: false },
    { id: '9', title: 'title 9', categoryId: '3', subCategoriesIds: ['11'], status: false },
    { id: '10', title: 'title 10', categoryId: '1', subCategoriesIds: ['12'], status: false },
    { id: '11', title: 'title 11', categoryId: '2', subCategoriesIds: ['8', '9'], status: false },
    { id: '12', title: 'title 12', categoryId: '3', subCategoriesIds: ['12'], status: false },
    { id: '13', title: 'title 13', categoryId: '2', subCategoriesIds: ['10'], status: false },
    { id: '14', title: 'title 14', categoryId: '2', subCategoriesIds: ['12', '4'], status: false },
    { id: '15', title: 'title 15', categoryId: '3', subCategoriesIds: ['3'], status: false },
  ];

  private todosSubject$ = new BehaviorSubject(this.TODOS);

  get todos() {
    return this.TODOS;
  }

  getTodos(): Observable<TodoItemRaw[]> {
    // Return the Observable part of the BehaviorSubject
    return this.todosSubject$.asObservable();
  }

  createItem(newItem: TodoItemRaw) {
    const currentMaxId = this.TODOS
    .map(item => parseInt(item.id, 10))
    .reduce((max, currentId) => Math.max(max, currentId), 0);

    const newId = (currentMaxId + 1).toString();
    const newItemWithId: TodoItemRaw = { ...newItem, id: newId };
    this.TODOS = [...this.TODOS, newItemWithId];

    this.todosSubject$.next(this.TODOS);
  }

  updateItem(itemId: string, updatedItem: TodoItemRaw) {
    this.TODOS = this.TODOS.map(item =>
      item.id === itemId
        ? {
            ...updatedItem,
            id: item.id
          }
        : item
    );
  
    this.todosSubject$.next(this.TODOS);
  }

  deleteItem(itemId: string) {
    this.TODOS = this.TODOS.filter(item => item.id !== itemId);
    this.todosSubject$.next(this.TODOS);
  }

  toggleStatus(itemId: string) {
    this.TODOS = this.TODOS.map(item =>
      item.id === itemId
        ? {
            ...item,
            status: !item.status
          }
        : item
    );
  
    this.todosSubject$.next(this.TODOS);
  }

}
