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

   public login (data : any) {
     return this.http.post(this.apiUrl + `/Users/Login`, data )
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

   //subcategory
   public getSubCategoryList(): Observable<any[]> {
    return this.http.get<any>( this.apiUrl + `/SubCategories`)
  }

  public getSubCategoryByCateID ( id: number | string) {
    return this.http.get(this.apiUrl + `/SubCategories/CateId/${id}`)
  }

  public addSubCategory ( data: any) {
    return this.http.post(this.apiUrl + `/SubCategories`, data)
  }

  public updateSubCategory ( id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/SubCategories/${id}`, data)
  }

   public deleteSubCategory ( id: number | string) {
     return this.http.delete(this.apiUrl + `/SubCategories/${id}`)
   }

   //products
   public getProductList(): Observable<any[]> {
    return this.http.get<any>( this.apiUrl + `/Products`)
  }

  public getProductsBySubCategoryID(id: number): Observable<any[]> {
    return this.http.get<any>( this.apiUrl + `/Products/SubId/${id}`)
  }

  public getRelateProduct (id:number) : Observable<any> {
    return this.http.get<any> (this.apiUrl + `/Products/Diff/${id}`)
  }
  
  public getProductById(id: number): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + `/Products/${id}` )
  }

  public addProduct ( data: any) {
    return this.http.post(this.apiUrl + `/Products`, data)
  }

  public updateProduct ( id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/Products/${id}`, data)
  }

   public deleteProduct ( id: number | string) {
     return this.http.delete(this.apiUrl + `/Products/${id}`)
   }

   
}
