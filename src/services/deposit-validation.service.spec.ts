import { TestBed } from '@angular/core/testing';

import { DepositValidationService } from './deposit-validation.service';

describe('DepositValidationService', () => {
  let service: DepositValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
