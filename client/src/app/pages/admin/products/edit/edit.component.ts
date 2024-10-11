import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,ToastModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  toast = inject(HotToastService);
  router = inject(Router);
  productId!: string;

  editProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    // isShow: new FormControl(true),
    bidTime: new FormControl(''),
    startAt: new FormControl(''),
  });
  get title() {
    return this.editProductForm.get('title');
  }
  get price() {
    return this.editProductForm.get('price');
  }
  get image() {
    return this.editProductForm.get('image');
  }
  get description() {
    return this.editProductForm.get('description');
  }
  get category() {
    return this.editProductForm.get('category');
  }
  ngOnInit() {
    
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          const now = new Date(data.startAt);
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          const startAt = now.toISOString().slice(0, 16);
          this.editProductForm.patchValue({ ...data, startAt: startAt });
        },
        error: (error) => {
          this.toast.error('Error: ' + error.message);
        },
      });
    });
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.toast.error('Error: ' + error.message);
      },
    });
  }

  handleUpdateProduct() {
    console.log(this.editProductForm.value);
    this.productService
      .editProduct(this.productId, this.editProductForm.value)
      .subscribe({
        next: () => {
          this.toast.success('Update product successfully');
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.toast.error('Failed to update product: ' + error.message);
        },
      });
  }
}
