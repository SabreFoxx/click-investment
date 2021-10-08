import { TestBed } from '@angular/core/testing';

import { PlanRepositoryService } from './plan-repository.service';

describe('PlanRepositoryService', () => {
  let service: PlanRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
