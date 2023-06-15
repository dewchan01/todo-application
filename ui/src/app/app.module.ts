import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './services/todo.service';
import { MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule as TodoAppApiModule, BASE_PATH as TodoAppBasePath } from '@dewchan/todo-app-ng13-sdk';
import { AppConstants } from './app-constants/app-constants';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [TodoService,
    { provide: TodoAppBasePath, useValue: AppConstants.TodoAppServiceUrl },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class AppModule { }
