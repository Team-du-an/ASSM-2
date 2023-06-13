import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements DoCheck {
    isMenuRequired = false;
    isLoggedIn = false;
    isMenuAdminUser = false;
    isSidebar = false;
    grandTotal: number = 0;
    isOrder = false;

    constructor(
        private router: Router,
        private cartService: CartService,
        private service: AuthService,
        private toastr: ToastrService,
    ) {}

    ngDoCheck(): void {
        let currentUrl = this.service.getUserRole();

        if (currentUrl) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }

        if (this.service.getUserRole() === 'admin') {
            this.isMenuAdminUser = true;
        } else {
            this.isMenuAdminUser = false;
        }

        if (sessionStorage.getItem('username')) {
            this.isOrder = true;
        } else {
            this.isOrder = false;
        }

        this.cartService.getProduct().subscribe((res) => {
            this.grandTotal = res.length;
        });
    }

    logout(): void {
        this.toastr.info('Đã đăng xuất');
        sessionStorage.clear();
    }

    handleShow(): void {
        this.isSidebar = true;
    }

    hanldeHide(): void {
        this.isSidebar = false;
    }
}
