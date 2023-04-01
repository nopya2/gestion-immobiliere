import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypeListComponent } from './list.component';

describe('OperationTypeListComponent', () => {
  let component: OperationTypeListComponent;
  let fixture: ComponentFixture<OperationTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
