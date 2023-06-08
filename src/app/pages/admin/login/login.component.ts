import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { IAuth } from 'src/interfaces/Auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,
    ) {
        sessionStorage.clear();
    }

    userData: any;

    loginForm = this.formBuilder.group({
        username: this.formBuilder.control('', Validators.required),
        password: this.formBuilder.control('', Validators.required),
    });

    handleLogin() {
        if (this.loginForm.valid) {
            // this.authService.registerUser(this.loginForm.value).subscribe((res) => {
            //     console.log(res);

            //     this.toastr.success('Đăng ký thành công');
            //     this.router.navigate(['']);
            // });

            this.authService.getById(this.loginForm.value.username).subscribe((res) => {
                this.userData = res;

                console.log(this.userData);

                if (this.userData.password === this.loginForm.value.password) {
                    if (this.userData.isActive === true) {
                        sessionStorage.setItem('username', this.userData.id);
                        sessionStorage.setItem('user-role', this.userData.role);

                        this.router.navigate(['/admin']);
                    } else {
                        this.toastr.error('Vui lòng liên hệ admin', 'Bạn chưa được xác thực');
                    }
                } else {
                    this.toastr.warning('Tên đăng nhập hoặc mật khẩu không hợp lệ');
                }
            });
        } else {
            this.toastr.warning('Tên đăng nhập hoặc mật khẩu không hợp lệ');
        }
    }
}
