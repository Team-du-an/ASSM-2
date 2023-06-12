import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn()) {
            if (route.url.length > 0) {
                let menu = route.url[0].path;
                if (menu == 'signin') {
                    this.router.navigate(['']);
                    return false;
                } else {
                    return true;
                }
            }
        }
        return true;
    }
}
