import { TestBed } from '@angular/core/testing';

import { OrdonanceService } from './ordonance.service';

describe('OrdonanceService', () => {
  let service: OrdonanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdonanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
