import { DataService } from './../../Services/data.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';





export interface User {
  id: number 
  email: string;
  password: string
  username: string;
  address: string;
  roleId: number;
  telephone: string
}
export interface Role {
  id: number
  roleName: string;
}



@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;

  public roles: Role[] = []
  public ELEMENT_DATA: User[] = []

  displayedColumns: string[] = ['email', 'username', 'address', 'roleName', 'action'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  public selectedRole: any = {
    id:0, roleName: ""
  }

  private newUser : User = {
    id: 0,
    email: '',
    username: '',
    password: '',
    address: '',
    roleId:0,
    telephone:''
  }

  private newRole : Role ={
    id: 0,
    roleName:''
  }

  public user: User = Object.assign({}, this.newUser)
  public role: Role = Object.assign({}, this.newRole)




  constructor(private DataServices: DataService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
   }

  ngAfterViewInit() {
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
  
  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      console.log(content)
      this.SaveUser()
      this.closeResult = `Closed with: ${result}`;
      this.loadUser()
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public SaveUser () :void {
    console.log("add new user: ", this.user)
    this.DataServices.addUser(this.user).subscribe((data)=> {
      console.log('return-data: ' ,data)
    })
  }
  public ChangeRole(event: any) : void {
    this.user.roleId= parseInt(event.value) 
  }


  public updateUser ( id: number, user : User) : void {
    this.user = user

    console.log(this.user)
    console.log(id)
  }

  public deleteUser (id: number): void {
    this.DataServices.deleteUser(id).subscribe((data)=> {
      console.log("delete",data)
    })
  }
}

