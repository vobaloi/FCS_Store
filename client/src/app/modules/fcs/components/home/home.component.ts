import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../Services/data.service';
import {Router} from "@angular/router"

export interface SubCategory {
  Id: number
  SubCategoryName: string;
  SubCategoryDescription: string;
  CategoryId: number
}

export interface Product {
  Id: number;
  ProductName: string;
  Price: number;
  Quantity: number;
  ImageURL: string;
  SubCategoryId: number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public phones: SubCategory[] = []
  public accessories: SubCategory[] = []

  public products : Product[] =[]

  constructor(private DataServices: DataService , private router: Router) { }

  private newSubCategory : SubCategory = {
    Id: 0,
    SubCategoryName: '',
    SubCategoryDescription: '',
    CategoryId: 0,
  }
  
  public count = 0

  public sliceDefault : number= 4

  public phone: SubCategory = Object.assign({}, this.newSubCategory)
  public accessory: SubCategory = Object.assign({}, this.newSubCategory)

  ngOnInit(): void {
     this.loadSubCategory()
     this.loadProduct()
  }
  // public loadCategory () {
  //   this.DataServices.getCategoryList().subscribe((data) => {
  //     this.categories = data as Category[]
  //     console.log("category: ",data)
  //   })
  // }
  // public target (event: any) {
  //   console.log("value",event.target)
  // }

  public loadSubCategory() {
    this.LoadPhoneCategory()
    this.LoadAccessoriesCategory()
  }

  public LoadPhoneCategory (id: number=1) {
    this.DataServices.getSubCategoryByCateID(id).subscribe((data)=> {
      this.phones = data as SubCategory[]
      console.log("Phones:",this.phones)
      this.count = this.phones.length
      console.log("count:",this.count)
    })
  }

  public LoadAccessoriesCategory (id: number=2) {
    this.DataServices.getSubCategoryByCateID(id).subscribe((data)=> {
      this.accessories = data as SubCategory[]
      console.log("Accessories:",this.accessories)
    })
  }


  public loadProduct() {
    this.DataServices.getProductList().subscribe((data) => {
      this.products = data as Product[]
      console.log("products: ",data)
    })
  }

  public onSelectSubcategory(item: any) {
    this.router.navigate(['/products/Sub/', item.Id])
  }


  public ChangeSlice () {
    this.sliceDefault = this.products.length
  }

  public onSelectProduct (item: any) {
    // console.log("item",item)
    this.router.navigate(['/single-item/', item.Id])
  }
  
  public AddCart (item : any) {
    console.log("item", item)
  }

}
