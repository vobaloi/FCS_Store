import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import {ActivatedRoute, ParamMap, Router} from "@angular/router"


export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageURL: string;
  subCategoryId: number;
}

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  public value= 2

  public param : any
  public productGet : any
  public productId: number = 0

  public relateProducts : Product[] = []


  private newProduct : Product ={
    id: 0,
    productName: '',
    price: 0,
    quantity: 0,
    imageURL: '',
    subCategoryId: 0,
  }
  public product: Product = Object.assign({}, this.newProduct)

  public relateProduct: Product = Object.assign({}, this.newProduct)

  constructor(private DataServices: DataService, private route: ActivatedRoute, private router : Router ) { }

  ngOnInit(): void {
    // let id = parseInt(this.route.snapshot.params['id'])
    // this.productId = id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.param = params.get('id')
      
      let id = parseInt(this.param)
      this.productId = id;
      this.loadProduct()
      this.loadRelateProduct()
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
    this.router.navigate(['/single-item/', item.id])

  }

}
