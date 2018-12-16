import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

import { IRanking } from './ranking.model';
import { ranking } from '../../mocks/ranking';
import { of } from 'rxjs';
import { flatMap,map } from 'rxjs/operators';
//import { footballApi } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class RankingService {
    
    constructor(private http: HttpClient) {}

    getRanking(): Observable<IRanking[]> {
        let matchsObservable:Observable<any> = of(ranking);
        // TODO uncomment to use real service call
        //this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        //this.http.get(footballApi)
        return matchsObservable
        .pipe(map((apiRanking:any) => 
                    apiRanking.map((apiRanking)=> {
                     let appRanking:IRanking = {
                        teamname: apiRanking.team_name,
                        position: apiRanking.overall_league_position,
                        played: apiRanking.overall_league_payed,
                        w: apiRanking.overall_league_W,
                        d: apiRanking.overall_league_D,
                        l: apiRanking.overall_league_L,
                        gf: apiRanking.overall_league_GF,
                        ga: apiRanking.overall_league_GA,
                        pts: apiRanking.overall_league_PTS,
                    };
                    return appRanking;
                })   
        ));

    }
}