import { TestBed } from '@angular/core/testing';

import { HumourService } from './humour.service';

describe('HumourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HumourService = TestBed.get(HumourService);
    expect(service).toBeTruthy();
  });
});
