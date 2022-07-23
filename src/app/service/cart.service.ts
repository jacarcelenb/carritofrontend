import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
  public cartItemList: any[] = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
    constructor() { }
    getProducts(){
     return this.productList.asObservable();
    }

    setProduct(product: any){
        this.cartItemList.push(...product);
        this.productList.next(product);
    }

    addtoCart(product: any){
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        console.log(this.cartItemList);
        this.getTotalPrice();
    }
    getTotalPrice(): number {
        let granTotal = 0;
        this.cartItemList.map((a:any)=>{
            granTotal+= a.total;
        })
        return granTotal;
    }

    removeCartItem(product:any){
     this.cartItemList.map((a:any , index:any)=>{
        if (product.pro_id == a.pro_id) {
            this.cartItemList.splice(index, 1);
        }
     })
     this.productList.next(this.cartItemList)
    }

    removeAllCart(){
        this.cartItemList =[]
        this.productList.next(this.cartItemList)
    }



}
