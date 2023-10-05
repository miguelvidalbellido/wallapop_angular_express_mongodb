import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Producto } from '../models';
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

    getInfinite(params: any): Observable<Producto[]> {
        return this.apiService.get(
            '/api/products',
            new HttpParams({fromObject: params})).pipe(
                map(data => data.products)
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

    // updateOne(productoMod: any): Observable<String> {
    //     return this.apiService.put('/api/productos/' + productoMod.id, productoMod)
    //     .pipe(map(data => data))
    // }
}
