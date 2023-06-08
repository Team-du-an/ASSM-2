import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,
    ) {}

    registerForm = this.formBuilder.group({
        id: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        username: this.formBuilder.control('', Validators.required),
        email: this.formBuilder.control('', Validators.compose([Validators.required, Validators.email])),

        password: this.formBuilder.control(
            '',
            Validators.compose([
                Validators.required,
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'),
            ]),
        ),
        gender: this.formBuilder.control('male'),
        role: this.formBuilder.control(''),
        isActive: this.formBuilder.control(false),
    });

    handleRegister() {
        if (this.registerForm.valid) {
            this.authService.registerUser(this.registerForm.value).subscribe((res) => {
                console.log(res);

                this.toastr.success('Đăng ký thành công');
                this.router.navigate(['admin/login']);
            });
        } else {
            this.toastr.warning('Vui lòng nhập đúng dữ liệu');
        }
    }
}
