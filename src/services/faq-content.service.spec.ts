import { TestBed } from '@angular/core/testing';

import { FaqContentService } from './faq-content.service';

describe('FaqContentService', () => {
  let service: FaqContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
