import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketballService {

  private apiUrl = 'https://www.balldontlie.io/api/v1/stats';

  constructor(private http: HttpClient) { }


  getAllPlayers(): Observable<any> {
    const url = 'https://www.balldontlie.io/api/v1/players';
    return this.http.get(url).pipe(
      map(response => response['data'])
    );
  }

  getPlayerStats(playerId: number): Observable<any> {
    const url = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`;
    return this.http.get<{ data: any[] }>(url).pipe(
      map(response => response.data[0])
    );
  }


}
