import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from '../../todos/dto/create-todo.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from '../../todos/dto/update-todo.dto';
import { QueryTodoDto } from '../../todos/dto/query-todo.dto';

@Injectable()
export class TodoDataDatabaseService extends TypeOrmQueryService<Todo> {
  constructor(
    @InjectRepository(Todo) private readonly TodoDataRepo: Repository<Todo>,
  ) {
    super(TodoDataRepo, { useSoftDelete: true });
  }

  public async save(newData: CreateTodoDto) {
    return this.TodoDataRepo.save(newData);
  }

  public async find(query: QueryTodoDto): Promise<Todo[]> {
    const option: FindManyOptions<Todo> = { where: query };
    return this.TodoDataRepo.find(option);
  }

  public async remove(id: number): Promise<void> {
    await this.TodoDataRepo.delete(id);
  }

  public update(updateTodoDto: UpdateTodoDto) {
    updateTodoDto.completed = true;
  }
}
