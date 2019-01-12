import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';

import { IMatch } from './match.model';
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
      .set('APIkey', '66869ef860f058236e75d7466b804e053882c52a10c152f3111bef56e5463c4a');

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
            awayteamScore: apiMatch.match_awayteam_score
          };
          return appMatch;
        })
      ));
  }

  saveMatch(hometeam: string, awayteam: string, hometeamScore, awayteamScore: string) {
    const matchSaved = { hometeam: hometeam, awayteam: awayteam, hometeamScore: hometeamScore, awayteamScore: awayteamScore };
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
            creator: apiMatch.creator
          };
          this.savedMatch.push(appMatch);
          return appMatch;
        })
      ));
  }



  deleteMatch(matchId: string) {
    this.http.delete(environment.authApi+"match/delete/" + matchId)
      .subscribe(() => {
        let match = this.getsavedMatch();
        const updatedMatchs = this.savedMatch.filter(match => match.id !== matchId);
        this.savedMatch = updatedMatchs;
      })
  }
}