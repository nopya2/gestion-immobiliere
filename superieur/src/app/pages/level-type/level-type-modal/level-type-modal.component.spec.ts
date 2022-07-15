import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelTypeModalComponent } from './level-type-modal.component';

describe('LevelTypeModalComponent', () => {
  let component: LevelTypeModalComponent;
  let fixture: ComponentFixture<LevelTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelTypeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
