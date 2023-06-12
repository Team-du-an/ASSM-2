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
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CustomerGuard } from './middlewares/customer.guard';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
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
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'signin', component: SigninComponent, canActivate: [CustomerGuard] },
            { path: 'signup', component: SignupComponent },
            {
                path: '',
                component: HomePageComponent,
            },
            {
                path: 'cart',
                component: CartPageComponent,
            },
            {
                path: 'products',
                component: ProductPageComponent,
            },
            {
                path: 'products/:id',
                component: ProductDetailComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'about',
                component: AboutComponent,
            },
            {
                path: 'blog',
                component: BlogComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
