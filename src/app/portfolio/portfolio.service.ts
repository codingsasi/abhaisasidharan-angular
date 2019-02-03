import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Portfolio } from './portfolio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPortfolios(id: string): Observable<Portfolio[]> {
    if (id) {
      return this.http.get<Portfolio[]>(this.API_URL + '/api/node/portfolio/' + id);
    }
    else {
      return this.http.get<Portfolio[]>(this.API_URL + '/api/node/portfolio?sort=-created');
    }
  }

}
