import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModuleRootComponent } from './auth-module-root.component';

describe('AuthModuleRootComponent', () => {
  let component: AuthModuleRootComponent;
  let fixture: ComponentFixture<AuthModuleRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthModuleRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModuleRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
