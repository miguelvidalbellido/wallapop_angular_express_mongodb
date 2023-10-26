import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ApiSecureService } from './api_secure.service';
import { Comentario } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor (private apiService: ApiService,
    private apiSecureService: ApiSecureService) {}

  get(slug?: String): Observable<Comentario[]> {    
      return this.apiService.get('/api/comments/'+slug)
      .pipe(map(data => data.comments))
  }

  create(data?: Comment): Observable<Comentario> {    
    return this.apiSecureService.post('/api/comment/', {comment: data})
    .pipe(map(data => data.comments))
  }

  delete(id?: String): Observable<Comentario> {    
    return this.apiSecureService.delete('/api/comment/'+id)
    .pipe(map(data => data.comments))
  }
}
