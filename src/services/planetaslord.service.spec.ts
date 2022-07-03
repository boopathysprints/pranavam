import { TestBed } from '@angular/core/testing';

import { PlanetaslordService } from './planetaslord.service';

describe('PlanetaslordService', () => {
  let service: PlanetaslordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetaslordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
