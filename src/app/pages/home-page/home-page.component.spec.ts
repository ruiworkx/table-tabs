import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { of } from 'rxjs';


describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let todosService: TodosService;
  let categoryService: CategoryService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers: [
        TodosService, CategoryService
      ]
    })
    .compileComponents();

    todosService = TestBed.inject(TodosService);
    categoryService = TestBed.inject(CategoryService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTodoList method list should return the same row count with the todoService', () => {
    const originalTodos = todosService.todos;
    const categories = categoryService.categories;
    const subCategories = categoryService.subCategories;

    const processedList = component.getTodoList(originalTodos, categories, subCategories);

    expect(processedList.length).toEqual(originalTodos.length);

  });
  
});
