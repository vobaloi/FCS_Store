import { DataService } from '../Services/data.service';
import { OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

export interface SubCategory {
  Id: number
  SubCategoryName: string;
  SubCategoryDescription: string;
  CategoryId: number
}


export interface Category {
  Id: number
  CategoryName: string;
  CategoryDescription: string;
}

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class SubCategoriesComponent implements OnInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  displayModal: boolean = false;

  public categories: Category[] = []
  public subCate: SubCategory[] = []
  public ELEMENT_DATA: SubCategory[] = []

  displayedColumns: string[] = ['subCategoryName', 'subCategoryDescription','categoryName', 'action'];
  dataSource = new MatTableDataSource<SubCategory>(this.ELEMENT_DATA);

  private newSubCategory : SubCategory = {
    Id: 0,
    SubCategoryName: '',
    SubCategoryDescription: '',
    CategoryId: 0,
  }

  public subCategory: SubCategory = Object.assign({}, this.newSubCategory)

  constructor(private DataServices: DataService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadSubCategory()
    this.loadCategory()

    this.dataSource.paginator = this.paginator;
  }
  public loadCategory () {
    this.DataServices.getCategoryList().subscribe((data) => {
      this.categories = data as Category[]
      console.log("category: ",data)
    })
  }

  public loadSubCategory () {
    this.DataServices.getSubCategoryList().subscribe((data) => {
      this.dataSource.data = data as SubCategory[]
      console.log("subcategory: ",data)
    })
  }
  

  public saveCategory () :void {
    if ( this.subCategory.Id !== 0) {
    console.log("update")
    this.DataServices.updateSubCategory(this.subCategory.Id, this.subCategory).subscribe((data)=> {
      console.log('return-data update: ',data)
      this.messageService.add({severity:'info', summary:'Notification', detail:'You have updated'});
      this.loadSubCategory()
      })
    this.ResetForm()
    }
    else {
      console.log("add: ")
      this.DataServices.addSubCategory(this.subCategory).subscribe((data)=> {
      console.log('return-data add new: ',data)
      this.loadSubCategory()
    })
    this.ResetForm()
    }
  }

  public ChangeCategory(event: any) : void {
    this.subCategory.CategoryId= parseInt(event.value) 
    console.log("id select", this.subCategory.CategoryId)
  }


  public showUpdateForm ( id: number, subcategory : SubCategory) : void {
    this.subCategory = subcategory
    this.showModalDialog()
  }

  public deleteSubCategory (id: number): void {
    this.DataServices.deleteSubCategory(id).subscribe((data)=> {
      this.loadSubCategory()
    })
    
  }

  showModalDialog() {
    this.displayModal = true;
  
}
  confirmDelete(id: number, subCateName: string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ' + subCateName +'?',
        header: 'Warning',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteSubCategory(id);
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
  this.subCategory = this.newSubCategory
  this.displayModal= false
  }


}
