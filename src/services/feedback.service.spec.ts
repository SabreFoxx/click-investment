import { TestBed } from '@angular/core/testing';

import { LoadingFeedbackService } from './feedback.service';

describe('ToastService', () => {
  let service: LoadingFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
