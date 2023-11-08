import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaServiceService {
  private baseUrl = 'https://www.balldontlie.io/api/v1';
  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams`);
  }
}
