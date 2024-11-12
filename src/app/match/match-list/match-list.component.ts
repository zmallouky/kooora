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
  League: string;
  Logo: string;

  constructor(public postService: MatchService, private authService: AuthService,
    private route: ActivatedRoute) {
  };

  ngOnInit() {
    this.matchs = [];
    console.log("je suis dans le ngOnInit");
    this.userIsAutenticated = this.authService.getIsAuth(); // resolving issue when we dont show button even iw we loog at the first time
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAutenticated => {
      this.userIsAutenticated = isAutenticated;
    });
    this.route.params.subscribe(params => {
      this.idLeague = params['league'];
      this.idLeague = params['league'];

      if(this.idLeague == '152'){ this.League = 'ENGLAND'; this.Logo = 'england'}
      if(this.idLeague == '109'){ this.League = 'SPANISH'; this.Logo = 'spain'}
      if(this.idLeague == '127'){ this.League = 'FRANCE'; this.Logo = 'france'}
      let today = this.dateFormat(new Date().toLocaleDateString());
      this.matchServiceSubscribtion = this.postService.getMatchs(this.idLeague, today).subscribe((matchs: any[]) => {
        console.log("retour service=>" + matchs);
        this.matchs = matchs;
      });
    });



  }

  favorite(home: string, away: string, scoreHome: string, scoreAway, match_time, date: string, fav) {
    console.log("home :" + home + " away :" + away + "scoreHome " + scoreHome + "scoreAway" +
      scoreAway + " date :" + this.dateFormat(date) + " color :" + fav.color);
    if (fav.color != "warn"){
    fav.color = "warn"
    return this.postService.saveMatch(home, away, scoreHome, scoreAway, match_time);
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

  getDate(param: string) {

    if(this.idLeague == '152'){ this.League = 'ENGLAND'; this.Logo = 'england'}
    if(this.idLeague == '109'){ this.League = 'SPANISH'; this.Logo = 'spain'}
    if(this.idLeague == '127'){ this.League = 'FRANCE'; this.Logo = 'france'}
    this.matchs = [];
    let date = this.dateFormat(param);
    this.matchServiceSubscribtion = this.postService.getMatchs(this.idLeague, date).subscribe((matchs: any[]) => {
      console.log("retour service=>" + matchs);
      this.matchs = matchs;
    });
  }
  getsavedMatch() {
    return this.postService.getsavedMatch();
  }

  renitializeData(){
    console.log("renitialized data!");
    this.matchs = [];
  }

  doubleClick() {
    console.log("double click")
  }
  ngOnDestroy() {
    this.matchs = [];
    this.matchServiceSubscribtion.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
