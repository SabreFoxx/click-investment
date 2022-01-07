import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawTransactionComponent } from './withdraw-transaction.component';

describe('WithdrawTransactionComponent', () => {
  let component: WithdrawTransactionComponent;
  let fixture: ComponentFixture<WithdrawTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
