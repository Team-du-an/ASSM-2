import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
    selector: 'app-model-delete-product',
    templateUrl: './model-delete-product.component.html',
    styleUrls: ['./model-delete-product.component.scss'],
})
export class ModelDeleteProductComponent {
    constructor(
        private service: ProductService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dialogRef: MatDialogRef<UpdateProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    productList: any;
    editData: any;

    ngOnInit(): void {
        this.service.getAllProduct().subscribe((res) => {
            this.productList = res;
        });

        if (this.data.usercode != null && this.data.usercode != '') {
            this.service.getProductById(this.data.usercode).subscribe((res) => {
                this.editData = res;
                this.loadProductdata(this.data.usercode);
            });
        }
    }

    createForm = this.formBuilder.group({
        id: this.formBuilder,
    });

    loadProductdata(code: any) {
        this.service.getProductById(code).subscribe((res) => {
            this.editData = res;

            this.createForm.setValue({
                id: this.editData.id,
            });
        });
    }

    onHandleDelete() {
        this.service.deleteProduct(this.createForm.value.id as any).subscribe((res) => {
            this.toastr.success('Đã xóa sản phẩm');
            this.dialogRef.close();
        });
    }

    onCloseModal() {
        this.dialogRef.close();
    }
}
