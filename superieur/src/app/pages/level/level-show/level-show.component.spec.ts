import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelShowComponent } from './level-show.component';

describe('LevelShowComponent', () => {
  let component: LevelShowComponent;
  let fixture: ComponentFixture<LevelShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
