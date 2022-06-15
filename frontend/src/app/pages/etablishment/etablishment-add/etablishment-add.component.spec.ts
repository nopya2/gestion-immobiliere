import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablishmentAddComponent } from './etablishment-add.component';

describe('EtablishmentAddComponent', () => {
  let component: EtablishmentAddComponent;
  let fixture: ComponentFixture<EtablishmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtablishmentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablishmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
