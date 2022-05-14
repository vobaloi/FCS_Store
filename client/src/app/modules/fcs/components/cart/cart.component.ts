import { CartService } from '../../../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {

  
  public products : any = []
  public totalPrice : number = 0 
  public productPrices : any = []

  constructor(private messageService: MessageService, private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products)
    })

    
    console.log(this.products)
  }
  public dec (item : any) {
    for (let i =0; i<this.products.length; i++ ) {
      if(item.Id === this.products[i].Id) {
        this.products[i].Quantity_Buy -=1;
        if(this.products[i].Quantity_Buy<=0) {
          this.products[i].Quantity_Buy= 1
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Quantity must be than to 0'});
        }
        else {
          console.log("subPrice", item.price * this.products[i].quantity_Buy) 
        }
      }
    }
  }
  public inc (item : any) {
    for (let i =0; i<this.products.length; i++ ) {
      if(item.Id === this.products[i].Id) {
        this.products[i].Quantity_Buy +=1;
        if(this.products[i].Quantity_Buy >= this.products[i].Quantity) {
          this.products[i].Quantity_Buy = this.products[i].Quantity
          this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Quantity must be less than the quantity of Store'});
        }
        else {
         
          let abc = item.Price * this.products[i].Quantity_Buy
          console.log("sub",abc) 
        }
      }
    }
  }
}
