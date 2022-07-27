import { Injectable } from '@angular/core';
import { dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDish(id: string): Observable<dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  getDishes(): Observable<dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }
  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }
  
  constructor() { }
}
