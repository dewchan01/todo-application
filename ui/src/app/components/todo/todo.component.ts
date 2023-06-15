import { Component, OnInit } from '@angular/core';
import { CreateTodoDto } from '@dewchan/todo-app-ng13-sdk';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: [ './todo.component.scss' ]
})

export class TodoComponent implements OnInit {
    public displayedColumns: string[] = [ 'title', 'actions' ];
    public filter = 'all';
    public disabledState = false;
    public error = false;
    public newTodo = '';
    public dataSource = [];
    public isDisabled = true;

    constructor(private service: TodoService) { }

    public updateIsDisabled() {
        this.isDisabled = !(this.newTodo.length > 0) || this.newTodo.trim() === '';
    }

    public ngOnInit() {
        this.updateIsDisabled();
        this.service.loadData().subscribe(((result) => {
            this.dataSource = result;
        }));
    }

    public addTodo() {
        const newTodos: CreateTodoDto = {
            name: this.newTodo,
            completed: false
        };
        this.service.addTodo(newTodos).subscribe((_) => {
            this.ngOnInit();
        });
        this.newTodo = '';
    }

    public deleteTodo(id: number) {
        this.service.deleteTodo(id).subscribe(() => {
          this.service.loadData().subscribe((result) => {
            this.dataSource = result;
          });
        });
      }
      

    public async toggleDone(id: number) {
        (await this.service.toggleDone(id)).subscribe((_) => {
            this.ngOnInit();
        });
    }

    public filterTodo(filter: string) {
        this.service.filterTodo(filter).subscribe((result) => {
            this.dataSource = result;
            console.log(this.dataSource)
        });
    }

    public resetRadio() {
        this.filter = 'all';
    }

    public get errorMessage(): string | null {
        return this.error ? 'Validation errors in checkbox' : null;
    }
}
