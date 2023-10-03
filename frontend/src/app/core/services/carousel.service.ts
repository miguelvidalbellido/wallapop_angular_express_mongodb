import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Carousel, CarouselCategories } from '../models/carousel.model';

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

    getCategories(): Observable<CarouselCategories[]> {
        return this.apiService.get('/api/carousel/categories')
        .pipe(map(data => data.categories))
    }
}
