import { TestBed } from '@angular/core/testing';

import { LordinhouseService } from './lordinhouse.service';

describe('LordinhouseService', () => {
  let service: LordinhouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LordinhouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
