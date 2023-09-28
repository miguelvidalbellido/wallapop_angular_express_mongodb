import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Carousel } from '../models/carousel.model';

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

    getCategories(): Observable<Carousel[]> {
        return this.apiService.get('/api/categories/carousel')
        .pipe(map(data => data.categories))
    }
}
