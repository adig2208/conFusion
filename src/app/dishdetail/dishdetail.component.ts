import { Component, OnInit,Input } from '@angular/core';
import {dish} from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  @Input()
  dish : dish;
  
  constructor() { }

  ngOnInit() {
  }

}
