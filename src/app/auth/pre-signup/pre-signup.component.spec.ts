import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSignupComponent } from './pre-signup.component';

describe('PreSignupComponent', () => {
  let component: PreSignupComponent;
  let fixture: ComponentFixture<PreSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
