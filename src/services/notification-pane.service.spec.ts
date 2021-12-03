import { TestBed } from '@angular/core/testing';

import { NotificationPaneService } from './notification-pane.service';

describe('NotificationPaneService', () => {
  let service: NotificationPaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationPaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
