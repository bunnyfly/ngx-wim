import { TestBed } from '@angular/core/testing';

import { NgxWimService } from './ngx-wim.service';

describe('NgxWimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxWimService = TestBed.get(NgxWimService);
    expect(service).toBeTruthy();
  });
});
