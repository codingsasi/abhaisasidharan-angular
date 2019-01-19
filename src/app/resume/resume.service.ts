import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Resume } from './resume';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getResume(): Observable<Resume> {
    return this.http.get<Resume>(this.API_URL + '/api/resume');
  }
}
