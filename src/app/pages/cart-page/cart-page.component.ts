import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
    public products: any = [];
    public grandTotal: number = 0;
    public orderSuccess = false;

    constructor(private cartService: CartService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.cartService.getProduct().subscribe((res) => {
            this.products = res;

            this.grandTotal = this.cartService.getTotalPrice();
        });
        this.cartService.getProduct().subscribe((res) => {
            this.products = res;
            this.calculateGrandTotal();
        });
    }
    calculateGrandTotal() {
        let grandTotal = 0;
        for (let i = 0; i < this.products.length; i++) {
            const item = this.products[i];
            grandTotal += item.quantity * item.price;
        }
        return grandTotal;
    }

    removeCartItem(item: any) {
        this.cartService.removeCartItem(item);
        this.calculateGrandTotal();
    }

    emptyCart() {
        this.cartService.removeAllCart();
        this.calculateGrandTotal();
    }
    checkout() {
        // Các xử lý liên quan đến đặt hàng

        // Hiển thị thông báo đặt hàng thành công
        this.toastr.success('Bạn đã đặt hàng thành công', '😊😊😊');
    }
}
