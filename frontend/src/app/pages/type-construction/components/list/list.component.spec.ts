import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConstructionListComponent } from './list.component';

describe('TypeConstructionListComponent', () => {
  let component: TypeConstructionListComponent;
  let fixture: ComponentFixture<TypeConstructionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeConstructionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
