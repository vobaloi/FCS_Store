import { DataService } from './../../Services/data.service';
import { Observable } from 'rxjs';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';





export interface User {
  email: string;
  username: string;
  address: string;
  roleName: string
}



@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator ;
  ELEMENT_DATA: User[] = []
  displayedColumns: string[] = ['email', 'username', 'address', 'roleName'];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  private newUser : User = {
    email: '',
    username: '',
    address: '',
    roleName:''
  }

  public user: User = Object.assign({}, this.newUser)
  


  constructor(private DataServices: DataService) { }

  ngAfterViewInit() {
    this.DataServices.getUserList().subscribe((data) => {
      this.dataSource.data = data as User[]
      console.log("user",data)
    })
    

    this.dataSource.paginator = this.paginator;
  }
  

}
