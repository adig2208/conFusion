import { Component, OnInit, Inject } from '@angular/core';
import {leader} from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { flyInOut,visibility,expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders: leader[];
  dishErrMess: string;
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
      disherrmess => this.dishErrMess = <any>disherrmess);
  }


}
