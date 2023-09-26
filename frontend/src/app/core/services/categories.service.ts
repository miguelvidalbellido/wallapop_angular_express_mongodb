import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Category } from '../models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    subscribe() {
      throw new Error('Method not implemented.');
    }
    constructor (
        private apiService: ApiService
    ) {}

    get(): Observable<Category[]> {
        return this.apiService.get('api/categories')
        .pipe(map(data => data))
    }
}
