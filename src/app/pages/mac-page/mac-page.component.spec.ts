import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacPageComponent } from './mac-page.component';

describe('MacPageComponent', () => {
  let component: MacPageComponent;
  let fixture: ComponentFixture<MacPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MacPageComponent]
    });
    fixture = TestBed.createComponent(MacPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
