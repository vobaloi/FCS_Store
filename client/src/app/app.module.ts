
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PasswordModule} from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HomeComponent } from './modules/fcs/components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TableProductsComponent } from './Products/table-products/table-products.component';
// import { HeaderComponent } from './modules/fcs/components/header/header.component';
// import { FooterComponent } from './modules/fcs/components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { TableUsersComponent } from './Users/table-users/table-users.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    RegisterComponent,
    TableProductsComponent,
   
    PageNotFoundComponent,
    CartComponent,
    SingleProductComponent,
    ListProductsComponent,
    TableUsersComponent,
    CategoriesComponent,
    SubCategoriesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
