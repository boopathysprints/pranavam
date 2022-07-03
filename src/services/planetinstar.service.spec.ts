import { TestBed } from '@angular/core/testing';

import { PlanetinstarService } from './planetinstar.service';

describe('PlanetinstarService', () => {
  let service: PlanetinstarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetinstarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
