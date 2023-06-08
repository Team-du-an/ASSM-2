import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NgxDropzoneModule,

        ToastrModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
