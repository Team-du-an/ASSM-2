import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private service: ProductService,
        private toastr: ToastrService,
    ) {
        this.service.getAllCategory().subscribe((res) => {
            this.categories = res;
        });
    }

    categories: any[] = [];

    createForm = this.formBuilder.group({
        title: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        description: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
        categoryId: this.formBuilder.control('', [Validators.required]),
        images: this.formBuilder.control(new Array(), { nonNullable: true }),
        cost: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
        price: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    });

    // Multy files

    files: File[] = [];

    onSelect(event: any) {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    onRemove(event: any) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }

    onHandleUpload() {
        if (this.files.length === 0) {
            this.toastr.warning('Bạn chưa có file nào');
        } else {
            for (const file of this.files) {
                const formData = new FormData();

                formData.append('file', file), formData.append('upload_preset', 'upload_angular');
                formData.append('clound_name', 'dh96qogra');

                this.service.uploadFiles(formData).subscribe((res) => {
                    if (res) {
                        this.createForm.value.images?.push(res.url);

                        console.log(this.createForm.value.images);
                        this.toastr.success('Bạn đã upload ảnh thành công', 'vui lòng thêm vào cơ sở dữ liệu');
                    } else {
                        this.toastr.error('Upload ảnh không thành công');
                    }
                });
            }
        }
    }

    onHandleCreate() {
        if (this.createForm.valid) {
            this.service.createProduct(this.createForm.value).subscribe((res) => {
                console.log(res);

                this.toastr.success('Tạo sản phẩm thành công');

                this.router.navigate(['admin/list-product']);
            });
        } else {
            this.toastr.warning('Vui lòng nhập đúng dữ liệu');
        }
    }

    // one file

    // files = '';

    // //

    // onSelect(event: any) {
    //     this.files = event.target.files;
    // }

    // onRemove(event: any) {
    //     console.log(event);
    // }

    // onHandleUpload(event: any) {
    //     const target = event.target.files[0];

    //     const file = target;
    //     const formData = new FormData();

    //     formData.append('file', file), formData.append('upload_preset', 'upload_angular');
    //     formData.append('clound_name', 'dh96qogra');

    //     this.service.uploadFiles(formData).subscribe((res) => {
    //         console.log(res);

    //         if (res) {
    //             this.createForm.value.images = res.secure_url;
    //             this.files = res.secure_url;

    //             console.log(this.files);

    //             this.toastr.success('Bạn đã upload ảnh thành công', 'vui lòng thêm vào cơ sở dữ liệu');
    //         } else {
    //             this.toastr.error('Upload ảnh không thành công');
    //         }
    //     });
    // }

    // onHandleCreate() {
    //     if (this.createForm.valid) {
    //         this.service.createProduct({ ...this.createForm.value, images: this.files }).subscribe((res) => {
    //             console.log(res);

    //             this.toastr.success('Tạo sản phẩm thành công');

    //             this.router.navigate(['admin/list-product']);
    //         });
    //     } else {
    //         this.toastr.warning('Vui lòng nhập đúng dữ liệu');
    //     }
    // }
}
