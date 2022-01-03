import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyBlockComponent } from './verify-block.component';

describe('VerifyBlockComponent', () => {
  let component: VerifyBlockComponent;
  let fixture: ComponentFixture<VerifyBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
