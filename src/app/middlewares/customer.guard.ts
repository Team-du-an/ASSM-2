import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';

export class CustomerGuard implements CanActivate {
    constructor(private customerService: CustomerService, private router: Router, private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.customerService.isLoggedIn()) this.router.navigate(['']);
        return true;
    }
}
