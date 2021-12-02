import { TestBed } from '@angular/core/testing';

import { UIAdjustmentService } from './ui-adjustment.service';

describe('UIAdjustmentService', () => {
  let service: UIAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
