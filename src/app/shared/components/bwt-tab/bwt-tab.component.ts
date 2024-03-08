import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
// import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { TodosService } from 'src/app/core/services/todos.service';
import { TodoItem, TodoItemRaw } from '../../models';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDialogReactiveComponent } from 'src/app/shared/components/edit-dialog-reactive/edit-dialog-reactive.component';

@Component({
  selector: 'app-bwt-tab',
  templateUrl: './bwt-tab.component.html',
  styleUrls: ['./bwt-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BwtTabComponent  implements AfterViewInit, OnInit, OnChanges {

  
  @Input() todoList: TodoItem[];
  @Input() category: string;
  @Input() displayedColumns: string[] = ['id', 'title', 'category', 'subCategories', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private todosService: TodosService, 
    public dialog: MatDialog) {
  }

  private setDatasource() {
    const filtered = this.category ? this.todoList.filter(item => item.category.id === this.category) : this.todoList;
    this.dataSource = new MatTableDataSource(filtered);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.setDatasource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit() {
    this.setDatasource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRow() {
    const dialogRef = this.dialog.open(EditDialogReactiveComponent, {
      minWidth: '350px'
    });

    dialogRef.afterClosed().subscribe((result: TodoItemRaw) => {
      console.log('The dialog was closed');
      if(result) {
        this.todosService.createItem(result);
      }
    });
  }

  editRow(row: TodoItem) {
    const dialogRef = this.dialog.open(EditDialogReactiveComponent, {
      minWidth: '350px',
      data: row
    });

    dialogRef.afterClosed().subscribe( (result: TodoItemRaw) => {
      console.log('The dialog was closed');
      if(result) {
        this.todosService.updateItem(row.id, result);
      }
    });
  }

  toggleStatus(row: TodoItem){
    if(row) {
      this.todosService.toggleStatus(row.id);
    }
  }

  deleteRow(row: TodoItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '350px',
      data: { title: 'Confirm Delete', message: `Are you sure you want to delete the item ${row.title}?` }
    });

    dialogRef.afterClosed().subscribe((result: TodoItemRaw) => {
      if(result) {
        this.todosService.deleteItem(row.id);
      }
    });
  }

}