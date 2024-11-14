import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProductsComponent } from './approve-products.component';

describe('ApproveProductsComponent', () => {
  let component: ApproveProductsComponent;
  let fixture: ComponentFixture<ApproveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
