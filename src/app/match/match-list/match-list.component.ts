import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';

import { MatchService } from '../match.service';
import { IMatch } from '../match.model';
@Component({
    selector: 'app-match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.css']

})
export class MatchListComponent implements OnInit, OnDestroy {
    matchs : IMatch[] = [];
    matchServiceSubscribtion : Subscription;
    constructor( public postService: MatchService, private http: HttpClient) {};
    
    ngOnInit() {
        this.matchServiceSubscribtion =this.postService.getMatchs().subscribe((matchs:any[])=> {
            console.log("retour service=>" + matchs);
            this.matchs = matchs;
        });
    }

    maMetode(param:string) {
        console.log("j'ai cliqué favourite"+param);
    }
    

    getDate(param:string) {
        let date = param.split("/");
        let year = date[2];
        let month = date[0];
        let day = date[1];
        let valideDate = year.concat("-").concat(month).concat("-").concat(day);
        console.log("date!"+valideDate);
        this.http.post<{message: string}>('http://localhost:3000/api/footMatch/match', valideDate)
        .subscribe((responseData) =>{
            console.log("tbi");
        });
        return valideDate;
    }

    doubleClick() {
        console.log("double click")
    }
    ngOnDestroy() {
        this.matchServiceSubscribtion.unsubscribe();
    }
}