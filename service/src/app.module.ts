import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessModule } from './data-access/data-access.module';
import { TodosModule } from './todos/todos.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, DataAccessModule, TodosModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
