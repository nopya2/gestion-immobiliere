import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablishmentShowComponent } from './etablishment-show.component';

describe('EtablishmentShowComponent', () => {
  let component: EtablishmentShowComponent;
  let fixture: ComponentFixture<EtablishmentShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtablishmentShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablishmentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
