import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelTypeComponent } from './level-type.component';

describe('LevelTypeComponent', () => {
  let component: LevelTypeComponent;
  let fixture: ComponentFixture<LevelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
