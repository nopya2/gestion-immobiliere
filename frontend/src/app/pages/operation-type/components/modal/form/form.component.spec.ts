import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConstructionFormModalComponent } from './form.component';

describe('FormComponent', () => {
  let component: TypeConstructionFormModalComponent;
  let fixture: ComponentFixture<TypeConstructionFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeConstructionFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConstructionFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
