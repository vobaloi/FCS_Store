import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public badge: number;
  constructor( private cartService : CartService) { }

  ngOnInit(): void {
    // let itemcarts = localStorage.getItem("cartProduct")
    // this.badge = itemcarts.length;
    // this.bage = this.single.cartNumberFunc()
    //  this.cartItem()
    this.cartService.getProducts().subscribe((res: any) => this.badge = res.length)
  }

  // public cartItem () {
  //   if (localStorage.getItem("cartProduct") != null) {
  //     var cartCount = JSON.parse( localStorage.getItem("cartProduct")!)
  //     console.log("cartCount",cartCount)
  //     this.badge = cartCount.length;
  //   }
  // }

}
