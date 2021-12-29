import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawBlockComponent } from './withdraw-block.component';

describe('WithdrawBlockComponent', () => {
  let component: WithdrawBlockComponent;
  let fixture: ComponentFixture<WithdrawBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
