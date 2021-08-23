import { TestBed } from '@angular/core/testing';

import { UsertypeGuard } from './usertype.guard';

describe('UsertypeGuard', () => {
  let guard: UsertypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsertypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
