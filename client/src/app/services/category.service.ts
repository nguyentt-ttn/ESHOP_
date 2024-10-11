import { inject, Injectable } from '@angular/core';
import { Category } from '../../types/Category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'http://localhost:8080/api/categories';
  http = inject(HttpClient);
  getAllCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
  getCategoryById(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
}
