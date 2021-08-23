import { TestBed } from '@angular/core/testing';

import { AdmintypeGuard } from './admintype.guard';

describe('AdmintypeGuard', () => {
  let guard: AdmintypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmintypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
