import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Relationship } from './relationship';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  
  constructor(private http: HttpClient) { }

  getThumbnailUrl(field_thumbnail): Observable<Relationship> {
    return this.http.get<Relationship>(field_thumbnail);
  }
}
