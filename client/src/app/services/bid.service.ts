import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BidForm } from '../../types/Bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  apiUrl = 'http://localhost:8080/api/bids';
  http = inject(HttpClient)

  createBid(data:BidForm){
    return this.http.post(this.apiUrl, data)
  }

  updateBid(id: string, isWinBid: boolean) {
    return this.http.put(`${this.apiUrl}/${id}`, { isWinBid });
  }
}
