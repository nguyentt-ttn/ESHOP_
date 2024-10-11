import { Bid } from "./Bid";
import { Category } from "./Category";


export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // isShow: boolean;
  bids: Bid[];
  startAt: Date;
  endAt: Date;
  bidPriceMax: number;
};

export type ProductForm = {
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  // isShow: boolean;
};