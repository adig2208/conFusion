import { Injectable } from '@angular/core';
import { dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): dish[] {
    return DISHES;
  }
  getDish(id: string): dish {
    return DISHES.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
  constructor() { }
}
