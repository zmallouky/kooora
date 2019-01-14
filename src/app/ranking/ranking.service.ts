import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { IRanking } from './ranking.model';
import { ranking } from '../../mocks/ranking';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { matchs } from '../../mocks/matchs';
import { IScorer } from '../scorer/scorer.model';

@Injectable({providedIn: 'root'})
export class RankingService {
    topScorer = {};

    constructor(private http: HttpClient) {
    }

    getRanking(idLeague:string): Observable<IRanking[]> {
        //let matchsObservable:Observable<any> = of(ranking);
        // TODO uncomment to use real service call
        //this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        //this.http.get(footballApi)
        //console.log("league ==> "+idLeague);
        let params = new HttpParams()
        .set('action', 'get_standings')
        .set('league_id', idLeague)
        .set('APIkey', '04f3c7e3a2e8e0eb93efad3ca8a2b647229b9afb6ec4a4f56ad5229623f52158');
        //return matchsObservable
        return this.http.get(environment.footballApi, {params})
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
        ),
        map((teams:IRanking[])=> teams.sort((r1:IRanking, r2:IRanking) => {
            if(Number(r1.position) < Number(r2.position)) return -1;
            if(Number(r1.position) > Number(r2.position)) return 1;
            return 0;
          })));

    }

    getScorersRanking(idLeague:string): Observable<IScorer[]> {
        this.topScorer = {};
        let params = new HttpParams()
        .set('action', 'get_events')
        .set('from', '2018-08-01')
        .set('to', '2019-02-01')
        .set('league_id', idLeague)
        .set('APIkey', '04f3c7e3a2e8e0eb93efad3ca8a2b647229b9afb6ec4a4f56ad5229623f52158');
        //let matchObservable:Observable<any> = of(matchs);
        return this.http.get(environment.footballApi, {params})
            .pipe(
            map((matchs:any[]) => 
                matchs.map((match)=> {
                     match.goalscorer.map((goalscorer)=> {
                       let player = goalscorer.home_scorer.concat(goalscorer.away_scorer);
                       
                        if( this.topScorer[player] == undefined)
                            this.topScorer[player] = 1;
                        else
                            this.topScorer[player]++;
                       // console.log(player+" : "+this.topScorer[player]);
                        return this.topScorer;
                    })
                    return this.topScorer;
                 }))
            );
        
    }
}