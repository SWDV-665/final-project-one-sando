import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashContainerComponent } from './splash-container.component';

describe('SplashContainerComponent', () => {
  let component: SplashContainerComponent;
  let fixture: ComponentFixture<SplashContainerComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SplashContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
