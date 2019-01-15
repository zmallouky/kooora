import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMatch, IPrediction } from '../match/match.model';
import { Subscription } from 'rxjs';
import { MatchService } from '../match/match.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit, OnDestroy {
  public Date = new Date();

  liveMatchSpain: IPrediction[] = [];
  liveMatchFrance: IPrediction[] = [];
  liveMatchEngland: IPrediction[] = [];

  public userIsAutenticated = false;

  private authStatusSub: Subscription;

  matchServiceSubscribtion: Subscription;
  constructor(public postService: MatchService, private authService: AuthService ) { }

  ngOnInit() {
    this.userIsAutenticated = this.authService.getIsAuth(); // resolving issue when we dont show button even iw we loog at the first time
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAutenticated => {
      this.userIsAutenticated = isAutenticated;
    });

    let today = this.dateFormat(new Date().toLocaleDateString());

    this.matchServiceSubscribtion = this.postService.getPredictions('109', today).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchSpain = matchs;
    });

    this.matchServiceSubscribtion = this.postService.getPredictions('62', today).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchEngland = matchs;
    });

    this.matchServiceSubscribtion = this.postService.getPredictions('127', today).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchFrance = matchs;
    });
  }

  dateFormat(param: string) {
    let date = param.split("/");
    let year = date[2];
    let month = date[0];
    let day = date[1];

    let validFormat = year.concat("-").concat(month).concat("-").concat(day);
    return validFormat;
  }

  getDate(param: string) {
    this.liveMatchSpain = [];
    this.liveMatchEngland = [];
    this.liveMatchFrance = [];

    let date = this.dateFormat(param);
    this.matchServiceSubscribtion = this.postService.getPredictions('109', date).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchSpain = matchs;
    });

    this.matchServiceSubscribtion = this.postService.getPredictions('62', date).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchEngland = matchs;
    });

    this.matchServiceSubscribtion = this.postService.getPredictions('127', date).subscribe((matchs: any[]) => {
      console.log("live match service" + matchs);
      this.liveMatchFrance = matchs;
    });
  }
  ngOnDestroy() {
    this.matchServiceSubscribtion.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
