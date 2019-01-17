import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatchService } from '../match.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';


import { IMatch } from '../match.model';

@Component({
  selector: 'app-live-match',
  templateUrl: './match-live.component.html',
  styleUrls: ['./match-live.component.css']
})

export class MatchLiveComponent implements OnInit, OnDestroy {
  public Date = new Date();

  liveMatchSpain: IMatch[] = [];
  liveMatchFrance: IMatch[] = [];
  liveMatchEngland: IMatch[] = [];

  public userIsAutenticated = false;

  private authStatusSub: Subscription;

  matchServiceSubscribtion: Subscription;

  constructor(public postService: MatchService, private authService: AuthService ) { };

  ngOnInit() {
    this.userIsAutenticated = this.authService.getIsAuth(); // resolving issue when we dont show button even iw we loog at the first time
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAutenticated => {
      this.userIsAutenticated = isAutenticated;
    });

    let today = this.dateFormat(new Date().toLocaleDateString());

    this.matchServiceSubscribtion = this.postService.getLiveMatchs('109', today).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchSpain = matchs;
    });

    this.matchServiceSubscribtion = this.postService.getLiveMatchs('62', today).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchEngland = matchs;
    });

    this.matchServiceSubscribtion = this.postService.getLiveMatchs('127', today).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchFrance = matchs;
    });
  }

  favorite(home: string, away: string, scoreHome: string, scoreAway, match_time, date: string, fav) {
    console.log("home :" + home + " away :" + away + "scoreHome " + scoreHome + "scoreAway" +
      scoreAway + " date :" + this.dateFormat(date) + " color :" + fav.color);
    if (fav.color != "warn"){
    fav.color = "warn"
    //return this.postService.saveMatch(home, away, scoreHome, scoreAway, match_time);
  }

  }

  dateFormat(param: string) {
    let date = param.split("/");
    let year = date[2];
    let month = date[0];
    let day = date[1];

    let validFormat = year.concat("-").concat(month).concat("-").concat(day);
    return validFormat;
  }
  ngOnDestroy() {
    this.matchServiceSubscribtion.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}