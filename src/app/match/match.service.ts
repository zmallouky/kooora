import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

import { IMatch } from './match.model';
import { matchs } from '../../mocks/matchs';
import { of } from 'rxjs';
import { flatMap,map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class MatchService {
    
    constructor(private http: HttpClient) {}

    getMatchs(): Observable<IMatch[]> {
        //let matchsObservable:Observable<any> = of(matchs);
        // TODO uncomment to use real service call
        //this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        let params = new HttpParams()
        .set('action','get_events')
        .set('from','2018-12-01')
        .set('to','2018-12-02')
        .set('league_id','109')
        .set('APIkey','48e740cf97eecc9c1692f5b2d6bde1e90123ba1e5dc5c6699c7f38c9179c9e8f');
        //let matchsObservable:Observable<any> = this.http.get(environment.footballApi,{ params: params });
        //return matchsObservable
        return this.http.get(environment.footballApi,{params})
        .pipe(map((apiMatchs:any) => 
                 apiMatchs.map((apiMatch)=> {
                     let appMatch:IMatch = {
                        hometeam: apiMatch.match_hometeam_name,
                        awayteam: apiMatch.match_awayteam_name,
                        hometeamScore: apiMatch.match_hometeam_score,
                        awayteamScore: apiMatch.match_awayteam_score
                    };
                    return appMatch;
                })   
        ));

    }
}