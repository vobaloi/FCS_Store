import { DataService } from '../../../../Services/data.service';
import { OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';



export interface Category {
  Id: number
  CategoryName: string;
  CategoryDescription: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  displayModal: boolean = false;

  public cate: Category[] = []
  public ELEMENT_DATA: Category[] = []

  displayedColumns: string[] = ['categoryName', 'categoryDescription', 'action'];
  dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);


  private newCate : Category ={
    Id: 0,
    CategoryName:'',
    CategoryDescription:'',
  }

  public category: Category = Object.assign({}, this.newCate)

  constructor(private DataServices: DataService , private confirmationService: ConfirmationService, private messageService: MessageService) {

   }

  ngOnInit() {
    this.loadCategory()
    this.dataSource.paginator = this.paginator;
  }

  public loadCategory () {
    this.DataServices.getCategoryList().subscribe((data) => {
      this.dataSource.data = data as Category[]
      console.log("category: ",data)
    })
  }
  

  public saveCategory () :void {
    if ( this.category.Id !== 0) {
    console.log("update")
    this.DataServices.updateCategory(this.category.Id, this.category).subscribe((data)=> {
      console.log('return-data update: ',data)
      this.messageService.add({severity:'info', summary:'Notification', detail:'You have updated'});
      this.loadCategory()
      })
    this.ResetForm()
    }
    else {
      console.log("add")
      this.DataServices.addCategory(this.category).subscribe((data)=> {
      console.log('return-data add new: ',data)
      this.loadCategory()
    })
    this.ResetForm()
    }
  }

  // public ChangeRole(event: any) : void {
  //   this.category.roleId= parseInt(event.value) 
  // }


  public showUpdateForm ( id: number, category : Category) : void {
    this.category = category
    console.log("cate", category)
    this.showModalDialog()
  }

  public deleteCategory (id: number): void {
    this.DataServices.deleteCategory(id).subscribe((data)=> {
      this.loadCategory()
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
            this.deleteCategory(id);
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
  this.category = this.newCate
  this.displayModal= false
  }


}
