import { Component, ViewEncapsulation } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category, SubCategory, TodoItem, TodoItemRaw } from 'src/app/shared/models';
import { TodosService } from 'src/app/core/services/todos.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

  todoList$: Observable<TodoItem[]>;
  
  constructor(private todosService: TodosService, private categoriesService: CategoryService) {
    this.todoList$ = combineLatest([
      this.todosService.getTodos(),
      this.categoriesService.getCategories(),
      this.categoriesService.getSubCategories()
    ]).pipe(
      map(([items, categories, subCategories]) => this.getTodoList(items, categories, subCategories))
    );

  }

  getTodoList(list: TodoItemRaw[], categories: Category[], subCategories: SubCategory[]): TodoItem[] {
    // const newList = [];
    // for(let i = 0; i < list.length; i++) {
    //   let row = { id: list[i].id, title: list[i].title, subCategories: [], category: '' };
    //   for(let x = 0; x < this.categoriesService.SUB_CATEGORIES.length; x++) {
    //     for(let y = 0; y < list[i].subCategories.length; y++) {
    //       if(list[i].subCategories[y] === this.categoriesService.SUB_CATEGORIES[x].id)
    //         row.subCategories.push(this.categoriesService.SUB_CATEGORIES[x].name)
    //     }
    //   }
    //   for(let z = 0; z < this.categoriesService.CATEGORIES.length; z++) {
    //       if(list[i].category === this.categoriesService.CATEGORIES[z].id)
    //         row.category = this.categoriesService.CATEGORIES[z].name;
    //   }
    //   newList.push(row);
    // }

    return list.map(rawItem => {
      const subCategoriesIdsSet = new Set(rawItem.subCategoriesIds);

      return {
        id: rawItem.id,
        title: rawItem.title,
        status: rawItem.status,
        category: categories.find(cat => cat.id === rawItem.categoryId),
        subCategories: subCategories.filter(subcat => subCategoriesIdsSet.has(subcat.id))
      }
    });
  }

}
