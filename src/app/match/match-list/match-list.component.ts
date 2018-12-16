import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

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
    constructor( public postService: MatchService) {};
    
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
        return valideDate;
    }

    doubleClick() {
        console.log("double click")
    }
    ngOnDestroy() {
        this.matchServiceSubscribtion.unsubscribe();
    }
}