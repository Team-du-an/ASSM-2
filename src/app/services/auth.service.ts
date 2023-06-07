import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from 'src/interfaces/Auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    registerUser(inputField: IAuth | any): Observable<IAuth> {
        return this.http.post<IAuth>('http://localhost:3000/users', inputField);
    }

    getAll(): Observable<IAuth[]> {
        return this.http.get<IAuth[]>('http://localhost:3000/users');
    }

    getAllRole(): Observable<any> {
        return this.http.get('http://localhost:3000/roles');
    }

    getById(id: any) {
        return this.http.get(`http://localhost:3000/users/${id}`);
    }

    updateUser(id: any, inputField: any): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/users/${id}`, inputField);
    }

    isLoggedIn() {
        return sessionStorage.getItem('username') != null;
    }

    getUserRole() {
        return sessionStorage.getItem('user-role') != null ? sessionStorage.getItem('user-role')?.toString() : '';
    }
}
