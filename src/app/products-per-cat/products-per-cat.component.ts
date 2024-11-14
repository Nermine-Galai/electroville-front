import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service.service';
import { Router } from '@angular/router';
interface Brand {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-products-per-cat',
  templateUrl: './products-per-cat.component.html',
  styleUrls: ['./products-per-cat.component.css'] // Note: Use styleUrls instead of styleUrl
})
export class ProductsPerCatComponent implements OnInit {
  ProductsPerCat: any[] = [];
  ProductsSearched: any[] = [];
  category!: string;
  brands: Brand[] = [];
  searchName!: string;
  selectedBrands: string[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isProductsPath(): boolean {
    return this.router.url.startsWith('/products') && this.route.snapshot.queryParamMap.has('search');
  }

  ngOnInit(): void {
    console.log(this.router.url)
    this.fetchBrandNames();
    this.route.params.subscribe(params => {
      this.category = params['category']; // Retrieve category from route parameter
      
     
        this.getProductsByCategory();
        this.clearSelectedBrandsAndCheckboxes();
      
    });
    this.route.queryParams.subscribe(params => {
      this.searchName = params['search'];
      if (this.searchName) {
        this.searchProductsByName();
        this.clearSelectedBrandsAndCheckboxes();
      }
    });
  }
  
  clearSelectedBrandsAndCheckboxes(): void {
    this.selectedBrands = []; // Reset selected brands array
    this.brands.forEach(brand => brand.selected = false); // Uncheck all checkboxes
  }
  
  fetchBrandNames(): void {
    this.productService.getAllBrands().subscribe(
      (brands) => {
        this.brands = brands.map(name => ({ name, selected: false }));
      },
      (error) => {
        console.error('Error fetching brands', error);
      }
    );}

  getProductsByCategory(): void {
    this.productService.getProductByCategory(this.category).subscribe(
      (products) => {
        this.ProductsPerCat = products;
      },
      (error) => {
        console.error('Error fetching products for category', error);
      }
    );
  }

  getProductsByCategoryAndBrands(): void {
    const selectedBrandNames = this.selectedBrands.map(brand => brand);
    this.productService.getProductsByCategoryAndBrands(this.category, selectedBrandNames).subscribe(
      (products) => {
        this.ProductsPerCat = products;
      },
      (error) => {
        console.error('Error fetching products for category and brands', error);
      }
    );
  }
  searchProductsByName() {
    if (this.selectedBrands.length > 0) {
      this.productService.searchProductsByName(this.searchName, this.selectedBrands).subscribe(
        (products) => {
          this.ProductsSearched = products;
          console.log('Products searched:', this.ProductsSearched); // Log the response
        },
        (error) => {
          console.error('Error fetching products by name and brands', error);
        }
      );
    } else {
      this.productService.searchProductsByName(this.searchName).subscribe(
        (products) => {
          this.ProductsSearched = products;
          console.log('Products searched:', this.ProductsSearched); // Log the response
        },
        (error) => {
          console.error('Error fetching products by name', error);
        }
      );
    }
  }
  

  toggleBrand(brand: Brand): void {
    brand.selected = !brand.selected;
    if (brand.selected) {
      this.selectedBrands.push(brand.name);
    } else {
      const index = this.selectedBrands.findIndex(selectedBrand => selectedBrand === brand.name);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }

    // After toggling brands, determine which method to call
    if (this.selectedBrands.length > 0) {
      this.getProductsByCategoryAndBrands();
      this.searchProductsByName();
    } else {
      this.getProductsByCategory();
      this.searchProductsByName();
    }
  }
  
  
  
}
