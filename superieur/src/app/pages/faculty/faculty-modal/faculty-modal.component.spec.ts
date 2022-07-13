import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyModalComponent } from './faculty-modal.component';

describe('FacultyModalComponent', () => {
  let component: FacultyModalComponent;
  let fixture: ComponentFixture<FacultyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
