import { TestBed } from '@angular/core/testing';

import { StyleAdjustmentService } from './style-adjustment.service';

describe('StyleAdjustmentService', () => {
  let service: StyleAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
