import { TestBed } from '@angular/core/testing';

import { SimpleHttpService } from './simple-post.service';

describe('SimplePostService', () => {
  let service: SimpleHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
