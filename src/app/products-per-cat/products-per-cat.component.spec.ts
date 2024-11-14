import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPerCatComponent } from './products-per-cat.component';

describe('ProductsPerCatComponent', () => {
  let component: ProductsPerCatComponent;
  let fixture: ComponentFixture<ProductsPerCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPerCatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsPerCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
