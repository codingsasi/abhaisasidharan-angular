import { TestBed } from '@angular/core/testing';

import { ResumeService } from './resume.service';

describe('ResumeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResumeService = TestBed.get(ResumeService);
    expect(service).toBeTruthy();
  });
});
