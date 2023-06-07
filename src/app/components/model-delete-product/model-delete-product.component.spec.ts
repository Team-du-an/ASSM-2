import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDeleteProductComponent } from './model-delete-product.component';

describe('ModelDeleteProductComponent', () => {
  let component: ModelDeleteProductComponent;
  let fixture: ComponentFixture<ModelDeleteProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelDeleteProductComponent]
    });
    fixture = TestBed.createComponent(ModelDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
