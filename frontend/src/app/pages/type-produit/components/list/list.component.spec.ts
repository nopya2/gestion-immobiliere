import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProduitListComponent } from './list.component';

describe('TypeProduitListComponent', () => {
  let component: TypeProduitListComponent;
  let fixture: ComponentFixture<TypeProduitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProduitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
