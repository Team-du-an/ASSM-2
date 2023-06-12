import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
    formSignin = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    userData: any;

    constructor(
        private fb: FormBuilder,
        private authServices: AuthService,
        private router: Router,
        private toastr: ToastrService,
    ) {}
    onHandleSubmit() {
        if (this.formSignin.valid) {
            this.authServices.getById(this.formSignin.value.username).subscribe((data) => {
                console.log(data);

                this.userData = data;

                sessionStorage.setItem('email', this.userData.username);
                sessionStorage.setItem('user-role', this.userData.role);
                this.router.navigateByUrl('/');
                this.toastr.success('Đăng nhập thành công', '😁😁😁');
            });
        }
    }
}
