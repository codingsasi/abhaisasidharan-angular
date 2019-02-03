import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faq } from './faq';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HumourService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.API_URL + '/api/node/faq');
  }
}
