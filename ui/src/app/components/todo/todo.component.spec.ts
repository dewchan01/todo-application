import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AlloyButtonModule, AlloyLabelModule } from '@dewchan/alloy';

import { TodoComponent } from './todo.component';
import { VersionService } from '../../services/version.service';

xdescribe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [ TodoComponent ],
            imports: [ HttpClientModule, AlloyButtonModule, AlloyLabelModule ],
            providers: [ VersionService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoComponent);
        const versionService = TestBed.inject(VersionService);
        spyOn(versionService, 'getMicroServiceVersion').and.returnValue(of('0'));
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
