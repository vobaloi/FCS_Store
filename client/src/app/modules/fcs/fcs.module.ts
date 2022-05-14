

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FcsContainComponent } from './components/fcs-contain/fcs-contain.component';

import { FcsRoutingModule } from './fcs-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CartComponent } from './components/cart/cart.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';




@NgModule({
  declarations: [
    FcsContainComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    TableUsersComponent,
    TableProductsComponent,
    ListProductsComponent,
    CartComponent,
    SingleProductComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    FcsRoutingModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    DialogModule,
    ButtonModule,
    DividerModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    InputNumberModule,
    FileUploadModule,
    RouterModule,
  ]
})
export class FcsModule { }
