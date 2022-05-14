import { CartService } from '../../../../Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../Services/data.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router"


export interface Product {
  Id: number;
  ProductName: string;
  Price: number;
  Quantity: number;
  ImageURL: string;
  SubCategoryId: number;
  Quantity_Buy: number
}

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  public quantity_buy: number = 1;

  public products: any
  public param : any
  public productGet : any
  public productId: number = 0

  public relateProducts : Product[] = []


  private newProduct : Product ={
    Id: 0,
    ProductName: '',
    Price: 0,
    Quantity: 0,
    ImageURL: '',
    SubCategoryId: 0,
    Quantity_Buy: 0
  }

  public product: Product = Object.assign({}, this.newProduct)
  public relateProduct: Product = Object.assign({}, this.newProduct)

  constructor(private DataServices: DataService, private route: ActivatedRoute, private router : Router , private cartService : CartService ) { }

  ngOnInit(): void {
    // let id = parseInt(this.route.snapshot.params['id'])
    // this.productId = id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.param = params.get('id')
      
      let id = parseInt(this.param)
      this.productId = id;
      this.loadProduct()
      this.loadRelateProduct()
      this.quantity_buy = 1
    })
     this.cartService.getProducts().subscribe((res: any)=>{
       this.products = res
     })
 
  }

  public loadProduct() {
    this.DataServices.getProductById(this.productId).subscribe((data) => {
      this.productGet = data as Product[]
      this.product = this.productGet
      // console.log("products: ",this.product)
    })
  }
  public loadRelateProduct() {
    this.DataServices.getRelateProduct(this.productId).subscribe((data) => {
      this.relateProducts = data as Product[]
      // console.log("products: ",this.relateProducts)
    })
  }

  public onSelectProduct (item: any) {
    // console.log("item",item)
    this.router.navigate(['/fcs/single-item/', item.Id])

  }

  public dec () {
    this.quantity_buy -=1
    if( this.quantity_buy<0)
    this.quantity_buy = 0
  }
  public inc () {
    this.quantity_buy += 1
    if(this.quantity_buy> this.product.Quantity)
    this.quantity_buy = this.product.Quantity
  }


  // public itemsCart: any = []
  // public SelectProduct(item: any) {
  //   this.product.quantity_Buy = this.quantity_buy
  //   console.log("product", item)
  //   let cartDataNull = localStorage.getItem("cartProduct")
  //   if(cartDataNull == null) {
  //     let storeDataGet : any = []
  //     storeDataGet.push(item)
  //     localStorage.setItem("cartProduct", JSON.stringify(storeDataGet))
  //   } else {
  //     var id = item.id
  //     let index: number = -1;
  //     this.itemsCart = JSON.parse(localStorage.getItem("cartProduct")!); 
  //     // console.log("cart_product", this.itemsCart)
  //     for(let i = 0 ;  i < this.itemsCart.length; i++) {
  //       if (parseInt(id) === parseInt(this.itemsCart[i].id)) {
  //         this.itemsCart[i].quantity_Buy = this.quantity_buy
  //         index = i;
  //         break;
  //       }
  //     }
  //     if (index == -1) {
  //       this.itemsCart.push(item)
  //       localStorage.setItem('cartProduct', JSON.stringify(this.itemsCart))
  //     } else {
  //       localStorage.setItem('cartProduct', JSON.stringify(this.itemsCart))
  //     }
  //   }
  //   this.cartNumberFunc()
  // }
  //   public cartNumber : number = 0
  //   public cartNumberFunc() {
  //     var cartValue = JSON.parse(localStorage.getItem("cartProduct")!) 
  //     this.cartNumber= cartValue.length;
  //     console.log("cartNumber", this.cartNumber)
  //   }



  public SelectProduct(item: any) {
    this.product.Quantity_Buy = this.quantity_buy
    console.log("product", item)
    let cartDataNull = this.products
    if(cartDataNull == null) {
      this.cartService.addToCart(item)
    } else {
      let index: number = -1;
      for(let i = 0 ;  i < this.products.length; i++) {
        if (item.Id === this.products[i].Id) {
          this.products[i].Quantity_Buy = this.quantity_buy
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.cartService.addToCart(item)
    }
  }
  }
}
