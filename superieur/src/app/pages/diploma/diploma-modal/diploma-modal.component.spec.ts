import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaModalComponent } from './diploma-modal.component';

describe('DiplomaModalComponent', () => {
  let component: DiplomaModalComponent;
  let fixture: ComponentFixture<DiplomaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
