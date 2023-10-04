import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { CarouselMulti } from '../models/carousel.model';

@Injectable({
    providedIn: 'root'
})
export class CarouselService {
    subscribe() {
      throw new Error('Method not implemented.');
    }
    constructor (
        private apiService: ApiService
    ) {}

    getCategories(): Observable<CarouselMulti[]> {
        return this.apiService.get('/api/carousel/categories')
        .pipe(map(data => data.categories))
    }
}
