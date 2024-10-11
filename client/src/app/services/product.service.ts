import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductForm } from '../../types/Product';


// export interface ApiResponse {
//   message: string;
//   data: Product[];
// }


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:8080/api/products';
  http = inject(HttpClient);

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  
  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  // getAll(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.apiUrl);
  // }
  getProductDetail(id: String) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  
  createProduct(data: ProductForm) {
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }
  editProduct(id: string, data: ProductForm) {
    return this.http.put(`${this.apiUrl}/${id}`, data,{headers: this.getHeaders()});
  }

  deleteProduct(id: string|number){
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
