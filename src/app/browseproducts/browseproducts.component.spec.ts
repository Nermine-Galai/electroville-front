import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseproductsComponent } from './browseproducts.component';

describe('BrowseproductsComponent', () => {
  let component: BrowseproductsComponent;
  let fixture: ComponentFixture<BrowseproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowseproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
