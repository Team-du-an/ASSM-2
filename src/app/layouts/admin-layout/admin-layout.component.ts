import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements DoCheck {
    isMenuRequired = false;
    isMenuAdminUser = false;
    isSidebar = false;

    constructor(private router: Router, private service: AuthService) {}

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
    }

    handleShow(): void {
        this.isSidebar = true;
    }

    hanldeHide(): void {
        this.isSidebar = false;
    }
}
