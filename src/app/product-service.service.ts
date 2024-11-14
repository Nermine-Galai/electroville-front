import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private url = 'http://localhost:8081/api/products'; 

  constructor(private http: HttpClient) { }
  getProductByStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.url}/status/${status}`);
  }
  getRecentApprovedProducts(): Observable<any> {
    return this.http.get<any>(`${this.url}/recent-approved`);
  }
 
  getAllBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/list`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
 
  getProductByVendorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/vendor/${id}`);
  }
  
  getProductByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.url}/category/${category}`);
  }

  getProductsByCategoryAndBrands(category: string, brands: string[]): Observable<any> {
    let params = new HttpParams();
    brands.forEach(brand => {
      params = params.append('brands', brand);
    });

    return this.http.get<any>(`${this.url}/category/${category}/brands`, { params });
  }

  searchProductsByName(name: string, brands: string[] = []): Observable<any> {
    let params = new HttpParams().set('name', name);
    if (brands.length > 0) {
      brands.forEach(brand => {
        params = params.append('brands', brand);
      });
    }

    return this.http.get<any>(`${this.url}/search`, { params });
  }
  




  createProduct(product: any, pictures: any[], vendorId: number): Observable<any> {
    const formData = new FormData();
    const currentDateTime = new Date().toISOString();
    const params = new HttpParams()
        .set('dateStr', currentDateTime);
    formData.append('product', JSON.stringify(product));

    for (let i = 0; i < pictures.length; i++) {
        formData.append('pictures', pictures[i].file);
    }

    return this.http.post<any>(`${this.url}/${vendorId}`, formData,{ params });
}



  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, product);
  }

 

  approveProduct(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}/approve`, null);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
