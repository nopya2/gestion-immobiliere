import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormModalComponent } from './form.component';

describe('FormComponent', () => {
  let component: CustomerFormModalComponent;
  let fixture: ComponentFixture<CustomerFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
