import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResetPwdComponent } from './employee-reset-pwd.component';

describe('EmployeeResetPwdComponent', () => {
  let component: EmployeeResetPwdComponent;
  let fixture: ComponentFixture<EmployeeResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeResetPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
