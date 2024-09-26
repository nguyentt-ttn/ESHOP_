import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  toast = inject(HotToastService);
  router = inject(Router)
  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.toast.success('Get product successfully')
      },
      error: (error) => {
        this.toast.error('Error: '+error.message)

      },
    });
  }

  handleDeleteProduct(id: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toast.error('Bạn cần đăng nhập để thực hiện thao tác này!');
      this.router.navigate(['/login']); 
      return;
    }
  
    // Nếu có token, tiếp tục xóa sản phẩm
    if (window.confirm('Bạn có chắc muốn xóa không?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product._id !== id);
          this.toast.success('Xóa sản phẩm thành công!');
        },
        error: (error) => {
          this.toast.error('Error: ' + error.message);
        },
      });
    }
  }
  
}
