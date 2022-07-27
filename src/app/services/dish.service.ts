import { Injectable } from '@angular/core';
import { dish } from '../shared/dish';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Observable<dish[]> {
    return this.http.get<dish[]>(baseURL + 'dishes');
  }

  getDish(id: number): Observable<dish> {
    return this.http.get<dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<dish> {
    return this.http.get<dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
  
  constructor(private http: HttpClient) { }
}
