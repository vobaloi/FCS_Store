import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';

export interface Category {
  id: number
  categoryName: string;
  categoryDescription: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public categories: Category[] = []

  constructor(private DataServices: DataService ) { }

  ngOnInit(): void {
    // this.loadCategory()
  }
  // public loadCategory () {
  //   this.DataServices.getCategoryList().subscribe((data) => {
  //     this.categories = data as Category[]
  //     console.log("category: ",data)
  //   })
  // }
  public target (event: any) {
    console.log("value",event.target)
  }




  

}
