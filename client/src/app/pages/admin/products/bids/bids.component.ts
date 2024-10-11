import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { BidService } from '../../../../services/bid.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../../types/Product';
import { HotToastService } from '@ngneat/hot-toast';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.css',
})
export class BidsComponent {
  productService = inject(ProductService);
  bidService = inject(BidService);
  route = inject(ActivatedRoute);
  toast = inject(HotToastService);

  product!:Product
  productId!:string
  getProductDetail(id:string){
    this.productService.getProductDetail(id).subscribe({
      next:(data)=>{
        this.product = data
      },
      error:(e)=>{
        this.toast.error('Error: '+e.message)
      }
    })
  }

  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.productId = params['id']
      this.getProductDetail(this.productId)
    })
  }

  handleSetBidWin(id: string) {
    this.bidService.updateBid(id, true).subscribe({
      next: (data) => {
        this.toast.success('Update success');
        this.getProductDetail(this.productId);
      },
      error: (error) => {
        this.toast.error('Error: ' + error.message);
      },
    });
  }
}
