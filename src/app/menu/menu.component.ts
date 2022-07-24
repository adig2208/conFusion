import { Component, OnInit } from '@angular/core';
import {dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: dish[] = DISHES;
  
  selectedDish: dish;
  constructor() { }

  ngOnInit() {
  }

  onSelect(dish: dish) {
    this.selectedDish=dish;
  }
}
