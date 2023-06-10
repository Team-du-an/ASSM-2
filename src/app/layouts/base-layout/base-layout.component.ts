import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements DoCheck {
    isMenuRequired = false;
    isMenuAdminUser = false;
    isSidebar = false;
    grandTotal: number = 0;

    constructor(private router: Router, private cartService: CartService, private service: AuthService) {}

    ngDoCheck(): void {
        let currentUrl = this.router.url;

        if (currentUrl === '/admin/login' || currentUrl === '/admin/register') {
            this.isMenuRequired = false;
        } else {
            this.isMenuRequired = true;
        }

        if (this.service.getUserRole() === 'admin') {
            this.isMenuAdminUser = true;
        } else {
            this.isMenuAdminUser = false;
        }

        this.cartService.getProduct().subscribe((res) => {
            this.grandTotal = res.length;
        });
    }

    handleShow(): void {
        this.isSidebar = true;
    }

    hanldeHide(): void {
        this.isSidebar = false;
    }
}
