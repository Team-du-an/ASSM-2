import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/interfaces/Product';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) {}

    // Product service

    createProduct(inputField: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/products', inputField);
    }

    getAllProduct(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>('http://localhost:3000/products');
    }

    getProductById(id: IProduct | any) {
        return this.http.get<IProduct>(`http://localhost:3000/products/${id}`);
    }

    updateProduct(id: number, inputField: any): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/products/${id}`, inputField);
    }

    deleteProduct(id: number) {
        return this.http.delete(`http://localhost:3000/products/${id}`);
    }

    // Category service

    getAllCategory(): Observable<any> {
        return this.http.get<any>('http://localhost:3000/categories');
    }

    // Files

    uploadFiles(files: any): Observable<any> {
        return this.http.post<any>(`https://api.cloudinary.com/v1_1/dh96qogra/image/upload`, files);
    }

    // Paginator

    paginatorProduct(page: string): Observable<string> {
        return this.http.get<string>(`http://localhost:3000/products?_page=${page}&_limit=10`);
    }

    // Filter by category

    filterByCategory(category: number): Observable<number> {
        return this.http.get<number>(`http://localhost:3000/products?categoryId=${category}`);
    }
}
