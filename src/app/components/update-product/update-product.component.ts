import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent {
    constructor(
        private service: ProductService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dialogRef: MatDialogRef<UpdateProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.service.getAllCategory().subscribe((res) => {
            this.categories = res;
        });
    }

    productList: any;
    categories: any[] = [];
    editData: any;

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

    createForm = this.formBuilder.group({
        id: this.formBuilder,
        title: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        description: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
        categoryId: this.formBuilder.control('', [Validators.required]),
        images: this.formBuilder.control(['']),
        cost: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
        price: this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    });

    ngOnInit(): void {
        this.service.getAllProduct().subscribe((res) => {
            this.productList = res;
        });

        if (this.data.usercode != null && this.data.usercode != '') {
            this.service.getProductById(this.data.usercode).subscribe((res) => {
                console.log(res);

                this.editData = res;

                this.loadProductdata(this.data.usercode);
            });
        }
    }

    loadProductdata(code: any) {
        this.service.getProductById(code).subscribe((res) => {
            this.editData = res;

            this.createForm.setValue({
                id: this.editData.id,
                title: this.editData.title,
                description: this.editData.description,
                categoryId: this.editData.categoryId,
                images: this.editData.images,
                cost: this.editData.cost,
                price: this.editData.price,
            });
        });
    }

    onHandleUpdate() {
        if (this.createForm.valid) {
            this.service.updateProduct(this.createForm.value.id as any, this.createForm.value).subscribe((res) => {
                this.toastr.success('Cập nhật sản phẩm thành công');
                this.dialogRef.close();
            });
        } else {
            this.toastr.warning('Vui lòng nhập đúng dữ liệu');
        }
    }
}
