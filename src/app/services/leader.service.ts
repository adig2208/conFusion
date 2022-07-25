import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): leader[] {
    return LEADERS;
  }
  getFeaturedLeader(): leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }
  constructor() { }
}
