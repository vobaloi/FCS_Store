import { DataService } from './../../Services/data.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';





export interface Product {
  Id: number;
  ProductName: string;
  Price: number;
  Quantity: number;
  ImageURL: string;
  SubCategoryId: number;
}

export interface SubCategory {
  Id: number
  SubCategoryName: string;
  SubCategoryDescription: string;
  CategoryId: number
}


@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TableProductsComponent implements OnInit {

  displayModal: boolean = false;

  public ELEMENT_DATA : Product[] = []

  public products: Product[]
  public subCategories : SubCategory[]

  uploadedFiles: any[] = [];

  displayedColumns: string[] = ['position','productName', 'price', 'quantity', 'subCategory','image','action'];
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  private newProduct : Product = {
    Id: 0,
    ProductName: '',
    Price: 0,
    Quantity: 0,
    ImageURL: '',
    SubCategoryId: 0
  }
  public product: Product = Object.assign({}, this.newProduct)

  constructor(private DataServices: DataService, private confirmationService: ConfirmationService, private messageService: MessageService) { }


  ngOnInit() {
    this.loadProduct();
    this.loadSubCategory()
    this.dataSource.paginator = this.paginator;
  }

  public loadProduct() {
    this.DataServices.getProductList().subscribe((data) => {
      this.dataSource.data = data as Product[]
      console.log("products: ",data)
    })
  }

  public loadSubCategory () {
    this.DataServices.getSubCategoryList().subscribe((data) => {
      this.subCategories = data as SubCategory[]
      console.log("subcategory: ",data)
    })
  }
  

  public saveProduct () :void {
    // console.log("data save", this.product)
    if ( this.product.Id !== 0) {
    console.log("update", this.product)
    this.DataServices.updateProduct(this.product.Id, this.product).subscribe((data)=> {
      console.log('return-data update: ',data)
      this.messageService.add({severity:'info', summary:'Notification', detail:'You have updated'});
      this.loadProduct()
      })
    this.ResetForm()
    }
    else {
      console.log("add: ", this.product)
      this.DataServices.addProduct(this.product).subscribe((data)=> {
      console.log('return-data add new: ',data)
      this.loadProduct()
    })
    this.ResetForm()
    }
  }

  public ChangeSubCategory(event: any) : void {
    this.product.SubCategoryId= parseInt(event.value) 
    console.log("id select", this.product.SubCategoryId)
  }


  public showUpdateForm ( id: number, product : Product) : void {
    this.product = product
    console.log("data",this.product)
    this.showModalDialog()
  }

  public deleteProduct (id: number): void {
    this.DataServices.deleteProduct(id).subscribe((data)=> {
      this.loadProduct()
    })
    
  }

  showModalDialog() {
    this.displayModal = true;
  
}
  confirmDelete(id: number, username: string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ' + username +'?',
        header: 'Warning',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteProduct(id);
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}
  public ResetForm () {
  this.product = this.newProduct
  this.displayModal= false
  }
  
  public ChangeImage (event: any) {
    console.log("Image", event.target.files[0])
    if(event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.product.ImageURL= event.target.result;
        console.log("result", this.product.ImageURL)
      }
    }
  }

}
