import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeader(id: string): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership/' + id);
  }
  getLeaders(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leadership');
  }

  getFeaturedLeader(): Observable<leader> {
    return this.http.get<leader[]>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]));
  }
  constructor(private http: HttpClient) { }
}



  

 

  

 