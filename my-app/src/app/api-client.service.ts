import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
  })
export class ApiClientService {
  baseUrl: string = 'http://localhost:3000';
  // 192.168.1.123

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor (private http: HttpClient) {}

  checkStationsStatus () {
    return timer(0, 30000).pipe(
      switchMap(_ => this.http.get<any>(`${this.baseUrl}/stations`)),
      catchError(error => of(`Bad request: ${error}`))
    );
  }

  getStations (): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/stations`);
  }
}
