import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { Todo } from '../data-access/todo-data/todo.entity';

@Controller('todos')
@ApiTags('Todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  public create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async find(@Query() queryTodoDto: QueryTodoDto) {
    return this.todosService.find(queryTodoDto);
  }

  @Get(':id')
  @ApiResponse({
    type: Todo,
  })
  public async findById(@Param('id') id: number) {
    return this.todosService.findById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(updateTodoDto, id);
  }

  @Delete(':id')
  public remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
