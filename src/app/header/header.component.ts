import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { RankingService } from '../ranking/ranking.service';
import { RankingComponent } from '../ranking/ranking.component';
import { MatchListComponent } from '../match/match-list/match-list.component';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {

  mobileQuery: MediaQueryList;
  rankingServiceSubscribtion: Subscription;
  rankingComponent: RankingComponent;
  //public matchlist:MatchListComponent;
  leagues:any[];

  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private _mobileQueryListener: () => void;

  constructor(public postService: RankingService, 
              changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher, 
              private authService: AuthService,
              private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth(); //check if we are are loggin so we won't loggin before than we enter login forms
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  getLeague(league){
    console.log("clicked"+league);
    this.router.navigate(['/ligaRank', league]);
  }

  getMatchLeague(league){
    
    //this.matchlist.renitializeData();
    console.log("clicked"+league);
    this.router.navigate(['/todayMatch', league]);
  }

  getScorer(league){
    
    //this.matchlist.renitializeData();
    console.log("clicked"+league);
    this.router.navigate(['/scorer', league]);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authListenerSubs.unsubscribe();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}
