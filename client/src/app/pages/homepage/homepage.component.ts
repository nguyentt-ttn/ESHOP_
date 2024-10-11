import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/Product';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  toast = inject(HotToastService);

  // ngOnInit() {
  //   this.productService.getAll().subscribe({
  //     next: (response) => {
  //       if (response.data && Array.isArray(response.data)) {
  //         this.products = response.data; // Gán mảng sản phẩm
  //       } else {
  //         this.products = []; // Gán rỗng nếu không có mảng
  //         this.toast.error('Data is not an array');
  //       }
  //     },
  //     error: (e) => {
  //       this.toast.error('Error: ' + e.message);
  //     },
  //   });
  // }
  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
       this.toast.error('Error: '+error.message)
      },
    });
  }
  
}
