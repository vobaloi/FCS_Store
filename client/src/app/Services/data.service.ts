import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public readonly apiUrl = "https://localhost:7199/api"

  constructor( private http: HttpClient) { }

  
  //Users
  public getUserList(): Observable<any[]> {
    return this.http.get<any>( this.apiUrl + `/Users`)
  }

  public getUserById(id: number | string) {
    return this.http.get<any>( this.apiUrl + `Users/${id}`)
  }

  public addUser ( data: any) {
    return this.http.post(this.apiUrl + `/Users`, data)
  }

  public updateUser ( id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/Users/${id}`, data)
  }

   public deleteUser ( id: number | string) {
     return this.http.delete(this.apiUrl + `/Users/${id}`)
   }


   //Roles
   public getRoleList(): Observable<any[]> {
    return this.http.get<any>( this.apiUrl + `/Roles`)
  }

  public addRole ( data: any) {
    return this.http.post(this.apiUrl + `/Roles`, data)
  }

  public updateRole ( id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/Roles/${id}`, data)
  }

   public deleteRoles ( id: number | string) {
     return this.http.delete(this.apiUrl + `/Roles/${id}`)
   }
   //Categories
   public getCategoryList(): Observable<any[]> {
    return this.http.get<any>( this.apiUrl + `/Categories`)
  }

  public addCategory ( data: any) {
    return this.http.post(this.apiUrl + `/Categories`, data)
  }

  public updateCategory ( id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/Categories/${id}`, data)
  }

   public deleteCategory ( id: number | string) {
     return this.http.delete(this.apiUrl + `/Categories/${id}`)
   }
   
}
