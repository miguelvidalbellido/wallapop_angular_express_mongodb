import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Producto, ProductoAndCount } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    subscribe() {
      throw new Error('Method not implemented.');
    }
    constructor (
        private apiService: ApiService
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
}
