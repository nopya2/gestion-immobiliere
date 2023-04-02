import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFormModalComponent } from './form.component';

describe('FormComponent', () => {
  let component: OwnerFormModalComponent;
  let fixture: ComponentFixture<OwnerFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
