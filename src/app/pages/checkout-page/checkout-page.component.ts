import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-checkout-page',
    templateUrl: './checkout-page.component.html',
    styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
    cityArr = [
        'An Giang',
        'Bà Rịa - Vũng Tàu',
        'Bắc Giang',
        'Bắc Kạn',
        'Bạc Liêu',
        'Bắc Ninh',
        'Bến Tre',
        'Bình Định',
        'Bình Dương',
        'Bình Phước',
        'Bình Thuận',
        'Cà Mau',
        'Cần Thơ',
        'Cao Bằng',
        'Đà Nẵng',
        'Đắk Lắk',
        'Đắk Nông',
        'Điện Biên',
        'Đồng Nai',
        'Đồng Tháp',
        'Gia Lai',
        'Hà Giang',
        'Hà Nam',
        'Hà Nội',
        'Hà Tĩnh',
        'Hải Dương',
        'Hải Phòng',
        'Hậu Giang',
        'Hoà Bình',
        'Hưng Yên',
        'Khánh Hòa',
        'Kiên Giang',
        'Kon Tum',
        'Lai Châu',
        'Lâm Đồng',
        'Lạng Sơn',
        'Lào Cai',
        'Long An',
        'Nam Định',
        'Nghệ An',
        'Ninh Bình',
        'Ninh Thuận',
        'Phú Thọ',
        'Phú Yên',
        'Quảng Bình',
        'Quảng Nam',
        'Quảng Ngãi',
        'Quảng Ninh',
        'Quảng Trị',
        'Sóc Trăng',
        'Sơn La',
        'Tây Ninh',
        'Thái Bình',
        'Thái Nguyên',
        'Thanh Hóa',
        'Thừa Thiên Huế',
        'Tiền Giang',
        'TP Hồ Chí Minh',
        'Trà Vinh',
        'Tuyên Quang',
        'Vĩnh Long',
        'Vĩnh Phúc',
        'Yên Bái',
    ];

    constructor(
        private formBuilder: FormBuilder,
        private orderService: OrderService,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
    ) {}

    user: any;

    ngOnInit(): void {
        this.authService.getById(sessionStorage.getItem('username')).subscribe((res) => {
            console.log(res);

            this.user = res;
        });
    }

    createForm = this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        city: this.formBuilder.control('', [Validators.required]),
        address: this.formBuilder.control('', [Validators.required]),
        code: this.formBuilder.control('', [Validators.required]),
        status: 1,
    });

    onHandleSubmit() {
        if (this.createForm.valid) {
            this.orderService
                .createOrder({ ...this.createForm.value, email: this.user.email, userId: this.user.id })
                .subscribe((res) => {
                    console.log(res);

                    this.toastr.success('Đăng ký thành công');
                    this.router.navigate(['']);
                });
        } else {
            this.toastr.warning('Vui lòng nhập đúng dữ liệu');
        }
    }
}
