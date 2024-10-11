import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MessageService],
})
export class CreateComponent {
  categories: Category[] = [];
  toast = inject(HotToastService);
  productService = inject(ProductService);
  router = inject(Router);
  categoryService = inject(CategoryService);
  messageService = inject(MessageService);

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    description: new FormControl(''),
    category: new FormControl('', Validators.required),
    startAt: new FormControl(''),
    bidTime: new FormControl('')
  });

  get title() {
    return this.addProductForm.get('title');
  }
  get price() {
    return this.addProductForm.get('price');
  }
  get image() {
    return this.addProductForm.get('image');
  }
  get description() {
    return this.addProductForm.get('description');
  }
  get category() {
    return this.addProductForm.get('category');
  }
  
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.toast.error('Failed to load categories: ' + error.message);
      },
    });
  }

  // handleCreateProduct() {
  //   if (this.addProductForm.invalid) {
  //     this.toast.error('Please fill out all required fields correctly.');
  //     return;
  //   }
  //   this.productService.createProduct(this.addProductForm.value).subscribe({
  //     next: (response) => {
  //       console.log('Product created successfully:', response);
  //       this.toast.success('Product created successfully!');
  //       this.router.navigate(['/admin']);
  //     },
  //     error: (error) => {
  //       console.error('Error creating product:', error);
  //       this.toast.error('Failed to create product: ' + error.message);
  //     },
  //   });
  // }
  handleCreateProduct() {
    console.log(this.addProductForm.value);
    this.productService
      .createProduct({ ...this.addProductForm.value, endAt: new Date() })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Create Product',
            detail: 'Thanh Cong',
          });
          setTimeout(
            () => this.router.navigate(['/admin']),
            1000
          )
          this.toast.success('Create product successfully');
        },
        error: (error) => {
          this.toast.error('Failed to create product: ' + error.message);
        },
      });
  }
}
