import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/interfaces/Product';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    product!: IProduct;

    constructor(
        private ptoductService: ProductService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = Number(params.get('id'));

            this.ptoductService.getProductById(id).subscribe((res) => {
                this.product = res;
            });
        });
    }

    addToCart(item: any) {
        this.cartService.addToCart(item);
    }
}
