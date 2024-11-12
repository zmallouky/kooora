import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';

import { IMatch, IPrediction } from './match.model';
import { matchs } from '../../mocks/matchs';

import { flatMap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class MatchService {

  private savedMatch: any[] = [];

  public idLeague: string;

  constructor(private http: HttpClient) {
  }

  getMatchs(idLeague:string, date:string): Observable<IMatch[]> {
    //let matchsObservable:Observable<any> = of(matchs);
    // TODO uncomment to use real service call
    //this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')

    let params = new HttpParams()
      .set('action', 'get_events')
      .set('from', date)
      .set('to', date)
      .set('league_id', idLeague)
      .set('APIkey', environment.apiKey);

    //let matchsObservable:Observable<any> = this.http.get(environment.footballApi,{ params: params });
    //return matchsObservable
    /*let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Headers', 'Authorization ')
      .append('Authorization','Bearer ');*/
    return this.http.
      get(environment.footballApi, { params })
      .pipe(map((apiMatchs: any) =>
        apiMatchs.map((apiMatch) => {
          let appMatch: IMatch = {
            hometeam: apiMatch.match_hometeam_name,
            awayteam: apiMatch.match_awayteam_name,
            hometeamScore: apiMatch.match_hometeam_score,
            awayteamScore: apiMatch.match_awayteam_score,
            match_time: apiMatch.match_time
          };
          return appMatch;
        })
      ));
  }
  getLiveMatchs(idLeague:string, date:string): Observable<IMatch[]> {

    let params = new HttpParams()
      .set('action', 'get_events')
      .set('from', date)
      .set('to', date)
      .set('league_id', idLeague)
      .set('match_live', '1')
      .set('APIkey', environment.apiKey);
    return this.http.
      get(environment.footballApi, { params })
      .pipe(map((apiMatchs: any) =>
        apiMatchs.map((apiMatch) => {
          let appMatch: IMatch = {
            hometeam: apiMatch.match_hometeam_name,
            awayteam: apiMatch.match_awayteam_name,
            hometeamScore: apiMatch.match_hometeam_score,
            awayteamScore: apiMatch.match_awayteam_score
          };
          return appMatch;
        })
      ));
  }

  getPredictions(idLeague:string, date:string): Observable<IPrediction[]> {

    let params = new HttpParams()
      .set('action', 'get_predictions')
      .set('from', date)
      .set('to', date)
      .set('league_id', idLeague)
      .set('APIkey', environment.apiKey);
    return this.http.
      get(environment.footballApi, { params })
      .pipe(map((apiMatchs: any) =>
        apiMatchs.map((apiMatch) => {
          let appMatch: IPrediction = {
            hometeam: apiMatch.match_hometeam_name,
            awayteam: apiMatch.match_awayteam_name,
            prob_HW: apiMatch.prob_HW,
            prob_D: apiMatch.prob_D,
            prob_AW: apiMatch.prob_AW,
            match_time: apiMatch.match_time
          };
          return appMatch;
        })
      ));
  }

  saveMatch(hometeam: string, awayteam: string, hometeamScore, awayteamScore: string, match_time) {
    const matchSaved = { hometeam: hometeam, awayteam: awayteam, hometeamScore: hometeamScore, awayteamScore: awayteamScore, match_time: match_time };
    this.http.post(environment.authApi+"match/save", matchSaved)
      .subscribe(response => {
        console.log(response);
      });
  }

  getsavedMatch(): Observable<any> {
    return this.http.get(environment.authApi+"match/")
      .pipe(map((apiMatchs: any) =>
        apiMatchs.map((apiMatch) => {
          let appMatch: any = {
            id: apiMatch._id,
            hometeam: apiMatch.hometeam,
            awayteam: apiMatch.awayteam,
            hometeamScore: apiMatch.hometeamScore,
            awayteamScore: apiMatch.awayteamScore,
            match_time: apiMatch.match_time,

            creator: apiMatch.creator
          };
          console.log(appMatch);
          this.savedMatch.push(appMatch);
          return appMatch;
        })
      ));
  }



  deleteMatch(matchId: string) : Observable<any> {
    return this.http.delete(environment.authApi+"match/delete/" + matchId);
  }
}
