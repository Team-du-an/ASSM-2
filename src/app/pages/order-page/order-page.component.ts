import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/interfaces/Oder';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
    constructor(private orderService: OrderService, private toastr: ToastrService, private router: Router) {}

    orders: any = [];

    ngOnInit(): void {
        this.orderService.getOrderbyId(this.orders).subscribe((res) => {
            this.orders = res;
        });
    }
}
