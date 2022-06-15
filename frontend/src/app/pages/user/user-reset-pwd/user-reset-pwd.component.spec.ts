import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetPwdComponent } from './user-reset-pwd.component';

describe('UserResetPwdComponent', () => {
  let component: UserResetPwdComponent;
  let fixture: ComponentFixture<UserResetPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResetPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
