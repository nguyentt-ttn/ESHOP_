import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../../types/Product';
import { NgFor, NgIf } from '@angular/common';
import { Category } from '../../../../types/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  toast = inject(HotToastService);
  router = inject(Router);
  // route = inject(ActivatedRoute);

  ngOnInit() {
    // this.route.params.subscribe((params)=>{
    //   this.categoryService.getCategoryById(params['id']).subscribe({
    //     next:(data) =>{this.category = data},
    //     error:(error)=>{this.toast.error('Error: '+error.message)}
    //   })
    // })

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.toast.error('Error: '+error.message)

      },
    });
  }
  
  handleDeleteProduct(id: string|number) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toast.error('Bạn cần đăng nhập để thực hiện thao tác này!');
      this.router.navigate(['/login']); 
      return;
    }
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
