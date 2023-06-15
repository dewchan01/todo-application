import { Injectable } from '@angular/core';

import { CreateTodoDto, TodosService } from '@dewchan/todo-app-ng13-sdk';
import { firstValueFrom } from 'rxjs';

interface TODO {
    id: number,
    completed: boolean
  }

@Injectable()
export class TodoService {
    constructor(private service: TodosService) { }

    public async toggleDone(id: number) {
        const todo = (await firstValueFrom(this.service.todosControllerFindById(id))) as TODO;
        if (todo.completed === false) {
            return this.service.todosControllerUpdate(id, { completed: true });
        }
        return this.service.todosControllerUpdate(id, { completed: false });
    }

    public deleteTodo(id: number) {
        return this.service.todosControllerRemove(id);
    }

    public addTodo(newTodo:CreateTodoDto) {
        return this.service.todosControllerCreate(newTodo);
    }

    public filterTodo(filter: string) {
        switch (filter) {
        case 'all':
            return this.service.todosControllerFind();
        case 'active':
            return this.service.todosControllerFind(undefined, false);
        case 'completed':
            return this.service.todosControllerFind(undefined, true);
        default:
            return this.service.todosControllerFind();
        }
    }

    public loadData() {
        return this.service.todosControllerFind();
    }
}
