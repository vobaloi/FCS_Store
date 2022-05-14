import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FcsRoutingModule } from './fcs-routing.module';
import { FcsContainComponent } from './components/fcs-contain/fcs-contain.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';


@NgModule({
  declarations: [
    FcsContainComponent,
    TableProductsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    SingleProductComponent,
    ListProductsComponent,
    TableUsersComponent,
    CategoriesComponent,
    SubCategoriesComponent,
  ],
  imports: [
    CommonModule,
    FcsRoutingModule,
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
    ProgressSpinnerModule,
    PasswordModule,
    ReactiveFormsModule
  ]
})
export class FcsModule { }
