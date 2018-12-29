import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';

//import {Post} from './match.model';
import {matchs} from '../../mocks/matchs';
import { of } from 'rxjs';
import { flatMap,map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {
    
    constructor(private http: HttpClient) {}

    getMatchs(): Observable<any> {
        let matchsObservable:Observable<any> =
        of(this.http.get<{message: string, posts: any}>('http://localhost:3000/api/footMatch')); //off match to
        // TODO uncomment to use real service call
        
        return matchsObservable
        .pipe(map((matchs:any[]) => 
                 matchs.map((match)=> {
                    return {
                        hometeam: match.match_hometeam_name,
                        awayteam: match.match_awayteam_name,
                        hometeamScore: match.match_hometeam_score,
                        awayteamScore: match.match_awayteam_score
                    };
                })   
        ));

    }
}