import { Component, OnInit } from '@angular/core';
import {dish} from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: dish[];

  selectedDish: dish;

  constructor(private dishService: DishService) { }
  
  ngOnInit() {
    this.dishes = this.dishService.getDishes();
  }

  onSelect(dish: dish) {
    this.selectedDish=dish;
  }
}
