import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

import { IMatch } from './match.model';
import { matchs } from '../../mocks/matchs';
import { of } from 'rxjs';
import { flatMap,map } from 'rxjs/operators';
//import { footballApi } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class MatchService {
    
    constructor(private http: HttpClient) {}

    getMatchs(): Observable<IMatch[]> {
        let matchsObservable:Observable<any> = of(matchs);
        // TODO uncomment to use real service call
        //this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        //this.http.get(footballApi)
        return matchsObservable
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