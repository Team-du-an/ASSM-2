import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { RegisterComponent } from './pages/admin/register/register.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AdminGuard } from './middlewares/auth.guard';
import { ListUserComponent } from './pages/admin/list-user/list-user.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CreateProductComponent } from './pages/admin/create-product/create-product.component';
import { ListProductComponent } from './pages/admin/list-product/list-product.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
    {
        path: 'admin',
        component: BaseLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'list-user',
                component: ListUserComponent,
                canActivate: [AdminGuard],
            },
            {
                path: 'create-product',
                component: CreateProductComponent,
            },
            {
                path: 'list-product',
                component: ListProductComponent,
            },
        ],
    },

    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
