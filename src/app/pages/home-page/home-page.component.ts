import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/interfaces/Product';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    products: IProduct[] = [];

    constructor(
        private service: ProductService,
        private cartService: CartService,
        router: Router,
        private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
        this.service.getAllProduct().subscribe((res) => {
            this.products = res;

            this.products.forEach((item: any) => {
                Object.assign(item, { quantity: 1, total: item.price });
            });
        });
    }

    addToCart(item: any) {
        this.toastr.success('Bạn đã thêm sản phẩm vào giỏ hàng', 'Mua thêm đi 😁😁');
        this.cartService.addToCart(item);
    }
}
