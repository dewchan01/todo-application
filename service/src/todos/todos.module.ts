import * as common from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { DataAccessModule } from '../data-access/data-access.module';

@common.Module({
  imports: [DataAccessModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
