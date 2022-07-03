import { TestBed } from '@angular/core/testing';

import { PlanetinhouseService } from './planetinhouse.service';

describe('PlanetinhouseService', () => {
  let service: PlanetinhouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetinhouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
