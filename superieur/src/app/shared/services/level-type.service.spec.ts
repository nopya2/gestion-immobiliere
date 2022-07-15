import { TestBed } from '@angular/core/testing';

import { LevelTypeService } from './level-type.service';

describe('LevelTypeService', () => {
  let service: LevelTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
