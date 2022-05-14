import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public productList =  new BehaviorSubject<any> ([])
  constructor() { }


  public getProducts ( ) {
    return this.productList.asObservable()
  }

  public setProduct (product : any) {
    this.cartItemList.push( ...product)
    this.productList.next(product)
  }

  public addToCart (product : any)  {
    this.cartItemList.push(product)
    this.productList.next(this.cartItemList)
    this.getTotalPrice()
    console.log("cart", this.cartItemList)
  }

  public getTotalPrice () : number {
    let Total =  0;
    this.cartItemList.map((a : any) => {
      Total += a.price
    })
    return Total
  }

  public removeCartItem (product : any) {
    this.cartItemList.map((a : any, index : any) =>{
      if (product.Id === a.Id) {
        this.cartItemList.splice(index,1)
        this.productList.next(this.cartItemList)
      }
    } )
  }

  public removeAllItem () {
    this.cartItemList = []
    this.productList.next(this.cartItemList)
  }
}
