import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagerEtablishmentComponent } from './add-manager-etablishment.component';

describe('AddManagerEtablishmentComponent', () => {
  let component: AddManagerEtablishmentComponent;
  let fixture: ComponentFixture<AddManagerEtablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManagerEtablishmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManagerEtablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
