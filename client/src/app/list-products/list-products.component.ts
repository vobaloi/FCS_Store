import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import {ActivatedRoute} from "@angular/router"

export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageURL: string;
  subCategoryId: number;
}

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  public products : Product[] =[]

  public idSub : number = 1

  constructor(private DataServices: DataService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.params['id'])
    this.idSub = id;
    this.loadProduct()
  }

  public loadProduct() {
    this.DataServices.getProductsBySubCategoryID(this.idSub).subscribe((data) => {
      this.products = data as Product[]
      console.log("products: ",data)
    })
  }

}
