import { TestBed } from '@angular/core/testing';

import { LordinsignService } from './lordinsign.service';

describe('LordinsignService', () => {
  let service: LordinsignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LordinsignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
