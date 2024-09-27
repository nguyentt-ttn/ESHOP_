import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Product = {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};
// export interface ApiResponse {
//   message: string;
//   data: Product[];
// }
export type ProductForm = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isShow: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  token = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.token}` };

  apiUrl = 'http://localhost:8080/api/products';
  http = inject(HttpClient);
  getAllProducts() {
    console.log(this.headers);
    return this.http.get<Product[]>(this.apiUrl);
  }
  // getAll(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(this.apiUrl);
  // }
  getProductDetail(id: String) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  createProduct(data: ProductForm) {
    return this.http.post(this.apiUrl, data);
  }
  deleteProduct(id: string) {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
