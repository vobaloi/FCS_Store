import { CartService } from '../../../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {

  public login: boolean = false
  public products : any = []
  public totalPrice : number = 0 
  public productPrices : any = []

  constructor(private messageService: MessageService, private cartService : CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products)
    })

    this.loadCart()
    // console.log("price", this.totalPrice)
  }
  public dec (item : any) {
    for (let i =0; i<this.products.length; i++ ) {
      if(item.Id === this.products[i].Id) {
        this.products[i].Quantity_Buy -=1;
        if(this.products[i].Quantity_Buy<=0) {
          this.products[i].Quantity_Buy= 1
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Quantity must be than to 0'});
        }
      }
    }
    this.loadCart()
  }
  public inc (item : any) {
    for (let i =0; i<this.products.length; i++ ) {
      if(item.Id === this.products[i].Id) {
        this.products[i].Quantity_Buy +=1;
        if(this.products[i].Quantity_Buy >= this.products[i].Quantity) {
          this.products[i].Quantity_Buy = this.products[i].Quantity
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Quantity must be less than the quantity of Store'});
        }
        // console.log("productlist", this.products)
      }
    }
    this.loadCart()
  }
  public loadCart () {
    if(this.products) {
      // console.log("productlist", this.products)
     this.totalPrice = this.products.reduce(function(acc : any, val: any) {
        return acc + (val.Price * val.Quantity_Buy)
      }, 0)
    }
  }
  public removeItem (item : any) {
    this.cartService.removeCartItem(item)
    this.cartService.getProducts()
    this.loadCart()
  }

  public emptyCart () {
    this.cartService.removeAllItem()
  }

  public Checkout() {
    if(this.login) {
      this.router.navigate(['/fcs/checkout'])
    } else {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'You need login to checkout'})
      setTimeout(()=> {
        this.router.navigate(['/login'])
      },2000)
    }
    
  }

}
