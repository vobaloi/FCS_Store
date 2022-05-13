import { AuthGuard } from './../../auth/auth.guard';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { HomeComponent } from './components/home/home.component';
import { FcsContainComponent } from './components/fcs-contain/fcs-contain.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  {path: '', component: FcsContainComponent, children: [
    // {path: '', redirectTo:'/fcs/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'cart', component: CartComponent},
    { path: 'categories', component: CategoriesComponent, canActivate:[AuthGuard] },
    { path: 'subcategories', component: SubCategoriesComponent , canActivate:[AuthGuard]},
    { path: 'table-products', component: TableProductsComponent , canActivate:[AuthGuard]},
    {path: 'single-item/:id', component: SingleProductComponent},
    { path: 'products/Sub/:id', component: ListProductsComponent },
    { path: 'users', component: TableUsersComponent , canActivate:[AuthGuard] },
    { path: 'checkout', component: CheckoutComponent , canActivate:[AuthGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcsRoutingModule { }
