import { Component, OnInit, Inject} from '@angular/core';
import { dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: dish;
  promotion: Promotion;
  leader: leader;
  dishErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish=>this.dish = dish,
    disherrmess => this.dishErrMess = <any>disherrmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion =>this.promotion = promotion,
      disherrmess => this.dishErrMess = <any>disherrmess);
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      disherrmess => this.dishErrMess = <any>disherrmess);
  }

}
