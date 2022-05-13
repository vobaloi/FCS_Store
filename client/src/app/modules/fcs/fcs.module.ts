import { TableProductsComponent } from './components/table-products/table-products.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FcsRoutingModule } from './fcs-routing.module';
import { FcsContainComponent } from './components/fcs-contain/fcs-contain.component';
import { FooterComponent } from './components/footer/footer.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';


import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
import { RouterModule } from '@angular/router';


import {PasswordModule} from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



@NgModule({
  declarations: [
    FcsContainComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    TableProductsComponent,
    SingleProductComponent,
    ListProductsComponent,
    TableUsersComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    FcsRoutingModule,
    ProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    DialogModule,
    ButtonModule,
    DividerModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    InputNumberModule,
    FileUploadModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule
  ]
})
export class FcsModule { }
