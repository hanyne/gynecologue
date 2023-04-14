import { TestBed } from '@angular/core/testing';

import { PatienteService } from './patiente.service';

describe('PatienteService', () => {
  let service: PatienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
