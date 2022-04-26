import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';

export interface SubCategory {
  id: number
  subCategoryName: string;
  subCategoryDescription: string;
  categoryId: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public phones: SubCategory[] = []
  public accessories: SubCategory[] = []

  constructor(private DataServices: DataService ) { }

  private newSubCategory : SubCategory = {
    id: 0,
    subCategoryName: '',
    subCategoryDescription: '',
    categoryId: 0,
  }
  
  public count = 0

  public phone: SubCategory = Object.assign({}, this.newSubCategory)
  public accessory: SubCategory = Object.assign({}, this.newSubCategory)

  ngOnInit(): void {
     this.loadSubCategory()
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


  

}
