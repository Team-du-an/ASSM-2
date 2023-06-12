import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    constructor(private toastr: ToastrService) {}

    public cartItemList: any = [];
    public productList = new BehaviorSubject<any>([]);

    getProduct() {
        return this.productList.asObservable();
    }

    setProduct(product: any) {
        this.cartItemList.push(...product);
        this.productList.next(product);
    }

    addToCart(product: any) {
        if (sessionStorage.getItem('user-role')) {
            this.cartItemList.push(product);
            this.productList.next(this.cartItemList);
            this.getTotalPrice();
            this.toastr.success('Đã thêm vào giỏ hàng', 'Mua thêm đi 😁😁');
        } else {
            this.toastr.warning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để thêm vào giỏ hàng');
        }
    }

    getTotalPrice(): number {
        let grandTotal = 0;
        this.cartItemList.map((a: any) => {
            grandTotal += a.total;
        });

        return grandTotal;
    }

    removeCartItem(product: any) {
        this.cartItemList.map((a: any, index: any) => {
            if (product.id === a.id) {
                this.cartItemList.splice(index, 1);
            }
        });
        this.productList.next(this.cartItemList);
    }

    removeAllCart() {
        this.cartItemList = [];
        this.productList.next(this.cartItemList);
    }
}
