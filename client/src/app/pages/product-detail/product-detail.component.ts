import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from '../../../types/Product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { BidService } from '../../services/bid.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe,CountdownComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  productService = inject(ProductService);
  bidService = inject(BidService)
  route = inject(ActivatedRoute);
  toast = inject(HotToastService)
  router = inject(Router)

  product!: Product| undefined
  config: CountdownConfig = {
    leftTime: 0,
    notify:[0]
  };

  bidForm:FormGroup = new FormGroup({
    price: new FormControl('', [Validators.required, Validators.min(1)]),
  })
  get price() {
    return this.bidForm.get('price');
  }

  productId!:string
  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
        const stepTimeBid = Math.floor(
          (new Date(data.endAt).getTime() - new Date().getTime()) / 1000)
          if (stepTimeBid <= 0) {
            this.toast.info('Đấu giá đã kết thúc.')
            this.bidForm.disable()
          } else {
            this.config = {
              leftTime: stepTimeBid, 
          }
          this.bidForm.enable()
        };
        
        // const maxPrice = Math.max(...data.bids.map((bid) => bid.price));
        // this.bidPriceMax = maxPrice;
      },
      error: (error) => {
        this.toast.error('Error: ' + error.message);
      },
    });
  }
  handleCountdownEvent(event: CountdownEvent) {
    if (event.left === 0 || event.action === 'done') {
      this.toast.info('Hết giờ đấu giá.');
      this.bidForm.disable();
    }
  }
  
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.productService.getProductDetail(params['id']).subscribe({
  //       next: (data) => (this.product = data),
  //       error: (e) => {
  //         this.toast.error('Error: ' + e.message);
  //       },
  //     });
  //   });
  // }
  handleSubmit() {
    
    if (!this.product) return;
    if (this.config.leftTime === 0 ) {
      this.toast.error('Hết giờ đấu giá!');
      
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.toast.error('Please login first!');
      this.router.navigate(['/login']);
      return;
    };

    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: userId,
        price: this.bidForm.value.price,
        bidPriceMax: this.product.bidPriceMax,
      })
      .subscribe({
        next: () => {
          this.getProductDetail(this.productId);
          this.bidForm.controls['price'].reset()
        },
        error: (error) => {
          console.error("Error creating bid:", error);
          this.toast.error('Error: ' + error.message);
        },
      });
  }
}