import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoDataDatabaseService } from './todo-data.database.service';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoDataDatabaseService],
  exports: [TodoDataDatabaseService],
})
export class TodoDatabaseModule {}
