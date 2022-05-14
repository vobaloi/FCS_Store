import { AuthGuard } from './auth/auth.guard';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CategoriesComponent } from './categories/categories.component';
import { TableUsersComponent } from './Users/table-users/table-users.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TableProductsComponent } from './Products/table-products/table-products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'home', component: HomeComponent , canActivate:[AuthGuard] },
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'single-item/:id', component: SingleProductComponent },
  { path: 'products/Sub/:id', component: ListProductsComponent },
  { path: 'users', component: TableUsersComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'subcategories', component: SubCategoriesComponent },


  { path: 'table-products', component: TableProductsComponent },


  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
