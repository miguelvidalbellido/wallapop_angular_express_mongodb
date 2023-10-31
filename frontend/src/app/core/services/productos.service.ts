import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Producto, ProductoAndCount } from '../models';
import { map } from 'rxjs/operators';
import { ApiSecureService } from './api_secure.service';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    subscribe() {
      throw new Error('Method not implemented.');
    }
    constructor (
        private apiService: ApiService,
        private apiSecureService: ApiSecureService
    ) {}

    get(): Observable<Producto[]> {
        return this.apiService.get('/api/products')
        .pipe(map(data => data.products))
    }

    getInfinite(params: any): Observable<ProductoAndCount> {
        return this.apiService.get(
            '/api/products',
            new HttpParams({fromObject: params})).pipe(
                map((data) => ({
                    products: data.products,
                    countProducts: data.productsCount
                }))
            )
    } 

    getProductCategory(slug: String): Observable<Producto[]> {
        return this.apiService.get('/api/products/categories/'+slug)
        .pipe(map(data => data.products))
    }

    getOne(slug?: String): Observable<Producto> {
        return this.apiService.get('/api/products/'+slug)
        .pipe(map(data => data.product))
    }

    favourite(slug?: String): Observable<boolean> {
        return this.apiService.put('/api/products/favourite/'+slug)
        .pipe(map(data => data.change_favourite))
    }

    getFavouritedProductsOfCurrentUser(params: any): Observable<ProductoAndCount> {
        return this.apiService.get(
            '/api/products/user/favorites',
            new HttpParams({fromObject: params})).pipe(
                map((data) => ({
                    products: data.products,
                    countProducts: data.productsCount
                }))
            )
    }

    getFavouritedProductsOfUserSlug(params: any, username: String): Observable<ProductoAndCount> {
        return this.apiService.get(
            '/api/products/user/profileFavorites/'+username,
            new HttpParams({fromObject: params})).pipe(
                map((data) => ({
                    products: data.products,
                    countProducts: data.productsCount
                }))
            )
    }

    getPublishedProductsOfUserSelug(params: any, username: String): Observable<ProductoAndCount> {
        return this.apiService.get(
            '/api/products/user/publishedProducts/'+username,
            new HttpParams({fromObject: params})).pipe(
                map((data) => ({
                    products: data.products,
                    countProducts: data.productsCount
                }))
            )
    }

    // Delete the product on the server
    create(product: Producto): Observable<any> {
        return this.apiSecureService
        .post('/api/product/create', {product})
        .pipe(map(data => {
            return data;
        }));
    }

    // Delete the product on the server
    update(slug: String, product: Producto): Observable<any> {
        return this.apiSecureService
        .put('/api/product/update/'+slug, {product})
        .pipe(map(data => {
            return data;
        }));
    }

    // Delete the product on the server
    delete(slug: String): Observable<any> {
        return this.apiSecureService
        .delete('/api/product/delete/'+slug)
        .pipe(map(data => {
            return data;
        }));
    }
}
