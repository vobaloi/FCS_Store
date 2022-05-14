import { CheckoutComponent } from './components/checkout/checkout.component';

import { HomeComponent } from './components/home/home.component';
import { FcsContainComponent } from './components/fcs-contain/fcs-contain.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CartComponent } from './components/cart/cart.component';
import { SingleProductComponent } from './components/single-product/single-product.component';

const routes: Routes = [
  {path: '', component: FcsContainComponent, children: [
    {path: '', redirectTo:'/fcs/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'categories', component: CategoriesComponent},
    { path: 'subcategories', component: SubCategoriesComponent },
    { path: 'users', component: TableUsersComponent },
    { path: 'table-products', component: TableProductsComponent },
    { path: 'products/Sub/:id', component: ListProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'single-item/:id', component: SingleProductComponent },
    { path: 'checkout', component: CheckoutComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FcsRoutingModule { }
