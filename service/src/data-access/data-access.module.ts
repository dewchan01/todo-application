import { Module } from '@nestjs/common';
import { TodoDatabaseModule } from './todo-data/todo-data.database.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, TodoDatabaseModule],
  exports: [TodoDatabaseModule],
})
export class DataAccessModule {}
