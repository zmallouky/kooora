import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MatchService } from '../match.service';
import { IMatch } from '../match.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']

})
export class MatchListComponent implements OnInit, OnDestroy {
  public Date = new Date();
  //planModel: any = {start_time: new Date() };
  matchs: IMatch[] = [];
  idLeague: string;
  matchServiceSubscribtion: Subscription;
  favColor = "warn";
  public userIsAutenticated = false;
  private authStatusSub: Subscription;

  constructor(public postService: MatchService, private authService: AuthService,
    private route: ActivatedRoute) {
    this.postService.Date = this.dateFormat(this.Date.toLocaleDateString());
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idLeague = params['league'];
    })
    this.matchServiceSubscribtion = this.postService.getMatchs(this.route.params).subscribe((matchs: any[]) => {
      console.log("retour service=>" + matchs);
      this.matchs = matchs;
    });
  
    this.userIsAutenticated = this.authService.getIsAuth(); // resolving issue when we dont show button even iw we loog at the first time
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAutenticated => {
      this.userIsAutenticated = isAutenticated;
    });

  }

  favorite(home: string, away: string, scoreHome: string, scoreAway, date: string, fav) {
    console.log("home :" + home + " away :" + away + "scoreHome " + scoreHome + "scoreAway" +
      scoreAway + " date :" + this.dateFormat(date) + " color :" + fav.color);
    if (fav.color == "warn")
      fav.color = "grey"
    else
      fav.color = "warn"
    return this.postService.saveMatch(home, away, scoreHome, scoreAway);

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
    this.route.params.subscribe(params => {
      this.idLeague = params['league'];
    })
    this.postService.Date = this.dateFormat(param);
    this.postService.announceDate(this.postService.Date);
    this.matchServiceSubscribtion = this.postService.getMatchs(this.idLeague).subscribe((matchs: any[]) => {
      console.log("retour service=>" + matchs);
      this.matchs = matchs;
    });
    return this.postService.Date;

  }
  getsavedMatch() {
    return this.postService.getsavedMatch();
  }

  doubleClick() {
    console.log("double click")
  }
  ngOnDestroy() {
    this.matchServiceSubscribtion.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}