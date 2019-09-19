import { TestBed } from '@angular/core/testing';

import { WimService } from './wim.service';

describe('WimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WimService = TestBed.get(WimService);
    expect(service).toBeTruthy();
  });
});
