import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IOrder } from 'src/interfaces/Oder';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

    createOrder(inputField: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/orders', inputField);
    }

    getOrderbyId(id: any) {
        return this.http.get(`http://localhost:3000/orders/${id}`);
    }
}
