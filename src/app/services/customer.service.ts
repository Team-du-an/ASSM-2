import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) {}

    signup(inputField: any) {
        this.http.post('http://localhost:3000/customers', inputField);
    }

    getById(id: any) {
        return this.http.get(`http://localhost:3000/customers/${id}`);
    }

    isLoggedIn() {
        return sessionStorage.getItem('username') != null;
    }

    getUserRole() {
        return sessionStorage.getItem('user-role') != null ? sessionStorage.getItem('user-role')?.toString() : '';
    }
}
