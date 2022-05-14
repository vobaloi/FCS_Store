import { DataService } from '../../../../Services/data.service';
import { OnInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';



export interface User {
  Id: number 
  Email: string;
  Password: string
  UserName: string;
  Address: string;
  RoleId: number;
  Telephone: string
}
export interface Role {
  Id: number
  RoleName: string;
}



@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TableUsersComponent implements OnInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  displayModal: boolean = false;

  public roles: Role[] = []
  public ELEMENT_DATA: User[] = []

  displayedColumns: string[] = ['email', 'username', 'address', 'roleName', 'action'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  public selectedRole: any = {
    id:0, roleName: ""
  }

  private newUser : User = {
    Id: 0,
    Email: '',
    UserName: '',
    Password: '',
    Address: '',
    RoleId:0,
    Telephone:''
  }

  private newRole : Role ={
    Id: 0,
    RoleName:''
  }

  public user: User = Object.assign({}, this.newUser)
  public role: Role = Object.assign({}, this.newRole)

 




  constructor(private DataServices: DataService , private confirmationService: ConfirmationService, private messageService: MessageService) {

   }

  ngOnInit() {
    this.loadUser()
    this.DataServices.getRoleList().subscribe((data) => {
       this.roles = data;
       console.log("roles: ",this.roles)
       
    })
    this.dataSource.paginator = this.paginator;
  }

  public loadUser () {
    this.DataServices.getUserList().subscribe((data) => {
      this.dataSource.data = data as User[]
      console.log("user",data)
    })
  }
  public SaveUser () :void {
    if ( this.user.Id !== 0) {
    console.log("update")
    this.DataServices.updateUser(this.user.Id, this.user).subscribe((data)=> {
      console.log('return-data update: ',data)
      this.loadUser()
      })
    this.ResetForm()
    }
    else {
      console.log("add")
      this.DataServices.addUser(this.user).subscribe((data)=> {
      console.log('return-data add new: ',data)
      this.loadUser()
    })
    this.ResetForm()
    }
  }

  public ChangeRole(event: any) : void {
    this.user.RoleId= parseInt(event.value) 
  }


  public showUpdateForm ( id: number, user : User) : void {
    this.user = user
    this.showModalDialog()
  }

  public deleteUser (id: number): void {
    this.DataServices.deleteUser(id).subscribe((data)=> {
      this.loadUser()
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
            this.deleteUser(id);
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
  this.user = this.newUser
  this.displayModal= false
  }

}

