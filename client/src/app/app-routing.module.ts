import { AuthGuard } from './auth/auth.guard';
import { SubCategoriesComponent } from './modules/fcs/components/sub-categories/sub-categories.component';
import { CategoriesComponent } from './modules/fcs/components/categories/categories.component';
import { TableUsersComponent } from './modules/fcs/components/table-users/table-users.component';
import { ListProductsComponent } from './modules/fcs/components/list-products/list-products.component';
import { SingleProductComponent } from './modules/fcs/components/single-product/single-product.component';
import { CartComponent } from './modules/fcs/components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableProductsComponent } from './modules/fcs/components/table-products/table-products.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './modules/fcs/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // { path: 'home', component: HomeComponent , canActivate:[AuthGuard] },
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {path:'fcs', loadChildren: ()}
  // { path: 'cart', component: CartComponent },
  // { path: 'single-item/:id', component: SingleProductComponent },
  // { path: 'products/Sub/:id', component: ListProductsComponent },
  // { path: 'users', component: TableUsersComponent },
  // { path: 'categories', component: CategoriesComponent },
  // { path: 'subcategories', component: SubCategoriesComponent },
// { path: 'subcategories', component: SubCategoriesComponent },

  // { path: 'table-products', component: TableProductsComponent },


  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
