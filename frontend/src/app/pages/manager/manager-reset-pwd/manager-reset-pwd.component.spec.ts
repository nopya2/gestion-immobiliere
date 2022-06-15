import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerResetPwdComponent } from './manager-reset-pwd.component';

describe('ManagerResetPwdComponent', () => {
  let component: ManagerResetPwdComponent;
  let fixture: ComponentFixture<ManagerResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerResetPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
