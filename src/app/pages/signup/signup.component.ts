import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
    formSignup = this.fb.group(
        {
            id: ['', [Validators.required]],
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            gender: ['male'],
            role: ['member'],
            isActive: [true],
        },
        { validators: this.checkPasswords },
    );
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
    ) {}

    checkPasswords(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        if (password === confirmPassword) return null;
        return { notMatch: true };
    }

    onHandleSubmit() {
        if (this.formSignup.valid) {
            this.authService.signup(this.formSignup.value).subscribe((data) => {
                console.log(data);
                this.toastr.success('Đăng ký thành công');
                // this.
                this.router.navigate(['/signin']);
            });
        } else {
            this.toastr.warning('Vui lòng nhập đúng dữ liệu', 'Nhập lại');
        }
    }
}
