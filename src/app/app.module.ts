import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialModule } from 'src/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/admin/register/register.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { ListUserComponent } from './pages/admin/list-user/list-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CreateProductComponent } from './pages/admin/create-product/create-product.component';
import { ListProductComponent } from './pages/admin/list-product/list-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ModelDeleteProductComponent } from './components/model-delete-product/model-delete-product.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MacPageComponent } from './pages/mac-page/mac-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        BaseLayoutComponent,
        ListUserComponent,
        UpdateUserComponent,
        DashboardComponent,
        CreateProductComponent,
        ListProductComponent,
        UpdateProductComponent,
        ModelDeleteProductComponent,
        SigninComponent,
        SignupComponent,
        AdminLayoutComponent,
        HomePageComponent,
        CartPageComponent,
        ProductPageComponent,
        ContactComponent,
        AboutComponent,
        BlogComponent,
        ProductDetailComponent,
        MacPageComponent,
        CheckoutPageComponent,
        OrderPageComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,

        // Ui lib
        MaterialModule,
        NgxDropzoneModule,
        NgxPaginationModule,

        ToastrModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
