import { TestBed } from '@angular/core/testing';

import { SignashouseService } from './signashouse.service';

describe('SignashouseService', () => {
  let service: SignashouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignashouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
