import { TestBed } from '@angular/core/testing';

import { PlanetinsignService } from './planetinsign.service';

describe('PlanetinsignService', () => {
  let service: PlanetinsignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetinsignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
