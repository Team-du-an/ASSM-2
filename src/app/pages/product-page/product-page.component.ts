import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/interfaces/Product';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
    products: any | IProduct[];
    categories: any;

    page: number = 1;
    count: number = 1;
    tableSize: number = 10;
    tableSizes: any = [5, 10, 15, 20];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private toastr: ToastrService,
    ) {
        this.loadProducts();
    }

    ngOnInit(): void {
        this.productService.getAllCategory().subscribe((res) => {
            this.categories = res;
        });
    }

    loadProducts() {
        this.productService.getAllProduct().subscribe((res) => {
            this.products = res;
        });
    }

    filterByCategory(e: any) {
        const categiryId = e.target.value;

        if (categiryId === '') {
            this.loadProducts();
        } else {
            this.productService.filterByCategory(categiryId).subscribe((res) => {
                this.products = res;
            });
        }
    }

    onTableChange(event: any) {
        this.tableSize = event.target.value;
        this.page = event;
        this.loadProducts();
    }

    addToCart(item: any) {
        this.cartService.addToCart(item);
    }
}
