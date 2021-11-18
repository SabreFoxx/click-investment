import { TestBed } from '@angular/core/testing';

import { SimplePostService } from './simple-post.service';

describe('SimplePostService', () => {
  let service: SimplePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
