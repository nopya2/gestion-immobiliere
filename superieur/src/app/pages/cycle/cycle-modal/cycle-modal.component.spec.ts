import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleModalComponent } from './cycle-modal.component';

describe('CycleModalComponent', () => {
  let component: CycleModalComponent;
  let fixture: ComponentFixture<CycleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
