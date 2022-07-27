import { Component, OnInit, Inject } from '@angular/core';
import {leader} from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: leader[];
  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe(leaders=>this.leaders = leaders);
  }

}
