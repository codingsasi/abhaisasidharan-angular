import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Blog, BlogTeaser } from './blog';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogTeaser[]> {
    return this.http.get<BlogTeaser[]>(this.API_URL + '/api/node/blog');
  }
  
  getBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>(this.API_URL + '/api/node/blog/' + id);
  }
}
