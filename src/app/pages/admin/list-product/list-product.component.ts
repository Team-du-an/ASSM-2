import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ModelDeleteProductComponent } from 'src/app/components/model-delete-product/model-delete-product.component';
import { UpdateProductComponent } from 'src/app/components/update-product/update-product.component';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/interfaces/Product';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {
    constructor(private service: ProductService, private toastr: ToastrService, private dialog: MatDialog) {
        this.loadProduct();
    }

    products: any;
    dataSource: any;
    displayedColumns: string[] = ['title', 'images', 'category', 'cost', 'price', 'action'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loadProduct() {
        this.service.getAllProduct().subscribe((res) => {
            this.products = res;
            this.dataSource = new MatTableDataSource(this.products);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    updateProduct(code: any) {
        this.OpenDialog('300ms', '300ms', code);
    }

    modelDelete(code: any) {
        this.openModelDelete('300ms', '300ms', code);
    }

    //

    OpenDialog(enteranimation: any, exitanimation: any, code: string) {
        const popup = this.dialog.open(UpdateProductComponent, {
            enterAnimationDuration: enteranimation,
            exitAnimationDuration: exitanimation,
            width: '50%',
            data: {
                usercode: code,
            },
        });
        popup.afterClosed().subscribe((res) => {
            this.loadProduct();
        });
    }

    openModelDelete(enteranimation: any, exitanimation: any, code: string) {
        const popup = this.dialog.open(ModelDeleteProductComponent, {
            enterAnimationDuration: enteranimation,
            exitAnimationDuration: exitanimation,
            width: '50%',
            data: {
                usercode: code,
            },
        });

        popup.afterClosed().subscribe((res) => {
            this.loadProduct();
        });
    }
}
