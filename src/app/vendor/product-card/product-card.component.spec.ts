import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardsComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardsComponent;
  let fixture: ComponentFixture<ProductCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
