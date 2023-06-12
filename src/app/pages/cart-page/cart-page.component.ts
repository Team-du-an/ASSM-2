import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
    public products: any = [];
    public grandTotal: number = 0;
    public role: any;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.getProduct().subscribe((res) => {
            this.products = res;

            this.grandTotal = this.cartService.getTotalPrice();
        });
    }

    removeCartItem(item: any) {
        this.cartService.removeCartItem(item);
    }

    emptyCart() {
        this.cartService.removeAllCart();
    }
}
