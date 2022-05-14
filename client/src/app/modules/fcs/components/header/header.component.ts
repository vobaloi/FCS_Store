import { DataService } from '../../../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../Services/cart.service';
// import { SingleProductComponent } from '../../../../single-product/single-product.component';
import { MY_CONST } from 'constain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public badge: number;
  public isLogin : boolean = false;
  public userDetail : any
  constructor( private cartService : CartService, private router : Router, private dataServices: DataService) { }

  ngOnInit(): void {
    // let itemcarts = localStorage.getItem("cartProduct")
    // this.badge = itemcarts.length;
    // this.bage = this.single.cartNumberFunc()
    //  this.cartItem()
    let Token = localStorage.getItem(MY_CONST.LOCAL_STORAGE_NAME)
    if(Token) {
      
    }
    this.dataServices.getUserLogin().subscribe((res:any)=> {
      this.userDetail = res.Data
      console.log("UserDetail", this.userDetail)
    })
    this.cartService.getProducts().subscribe((res: any) => this.badge = res.length)
  }

  // public cartItem () {
  //   if (localStorage.getItem("cartProduct") != null) {
  //     var cartCount = JSON.parse( localStorage.getItem("cartProduct")!)
  //     console.log("cartCount",cartCount)
  //     this.badge = cartCount.length;
  //   }
  // }
  public LogOut (){
    localStorage.removeItem(MY_CONST.LOCAL_STORAGE_NAME)
    this.router.navigate(['/login'])
  }
}
