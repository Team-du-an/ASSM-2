import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn()) {
            if (route.url.length > 0) {
                let menu = route.url[0].path;
                if (menu == 'admin/list-user') {
                    if (this.authService.getUserRole() == 'admin') {
                        return true;
                    } else {
                        this.router.navigate(['']);
                        this.toastr.warning('You dont have access.');
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            this.router.navigate(['admin/login']);
            return false;
        }
    }
}
