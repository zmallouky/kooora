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
    public Date = new Date();
    //planModel: any = {start_time: new Date() };
    matchs: IMatch[] = [];
    matchServiceSubscribtion: Subscription;
    favColor = "warn";


    constructor(public postService: MatchService) {
        this.postService.Date = this.dateFormat(this.Date.toLocaleDateString());
    };

    ngOnInit() {
        this.matchServiceSubscribtion = this.postService.getMatchs().subscribe((matchs: any[]) => {
            console.log("retour service=>" + matchs);
            this.matchs = matchs;
        });
    }

    favorite(home: string, away: string, scoreHome: string, scoreAway, date: string, fav) {
        console.log("home :" + home + " away :" + away + "scoreHome " + scoreHome + "scoreAway" +
            scoreAway + " date :" + this.dateFormat(date) + " color :" + fav.color);
        if (fav.color == "warn")
            fav.color = "grey"
        else
            fav.color = "warn"
        return this.postService.saveMatch(home, away, scoreHome, scoreAway);

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
        this.postService.Date = this.dateFormat(param);
        this.postService.announceDate(this.postService.Date);
        this.matchServiceSubscribtion = this.postService.getMatchs().subscribe((matchs: any[]) => {
            console.log("retour service=>" + matchs);
            this.matchs = matchs;
        });
        return this.postService.Date;

    }

    doubleClick() {
        console.log("double click")
    }
    ngOnDestroy() {
        this.matchServiceSubscribtion.unsubscribe();
    }
}