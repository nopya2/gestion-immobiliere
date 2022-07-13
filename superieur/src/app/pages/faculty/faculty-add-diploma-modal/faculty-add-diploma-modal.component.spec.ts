import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAddDiplomaModalComponent } from './faculty-add-diploma-modal.component';

describe('FacultyAddDiplomaModalComponent', () => {
  let component: FacultyAddDiplomaModalComponent;
  let fixture: ComponentFixture<FacultyAddDiplomaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyAddDiplomaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAddDiplomaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
