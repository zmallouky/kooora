
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

import { RankingService } from '../ranking/ranking.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { IScorer } from './scorer.model';



const ELEMENT_DATA: IScorer[] = [
  {player: 'messi', goals: '17'},
  {player: 'suarez', goals: '13'},

];

@Component({
  selector: 'app-scorer',
  templateUrl: './scorer.component.html',
  styleUrls: ['./scorer.component.css']
})

export class ScorerComponent implements OnInit {

  rankingServiceSubscribtion: Subscription;
  scorersSubscribtion: Subscription;
  scorers: any[];
  goals;
  isLoading: boolean;
  idLeague;
  tabScorer: IScorer[] = [];

  constructor(private rankingService: RankingService,private route: ActivatedRoute) { }

  displayedColumns: string[] = ['player', 'goals'];
 
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;



  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      //this.dataSource = null;
      this.isLoading = true;
      this.idLeague = params['league'];

      this.scorersSubscribtion = this.rankingService.getScorersRanking(this.idLeague).subscribe( (scorers:any[]) => {
        //this.zak=[scorers[0]];
        
        this.tabScorer = [];
       let scorer = scorers[0];
       console.log(scorers[0]);
       this.goals = scorer;
        this.scorers = Object.keys(scorers[0]);

        console.log(this.scorers[1] +" "+scorer[this.scorers[1]]);
        let i = 0;
        for(i = 0; i < this.scorers.length; i++ ){
          this.tabScorer.push({
            player:this.scorers[i],
            goals:scorer[this.scorers[i]],
          })
        }
        this.dataSource = new MatTableDataSource(this.tabScorer);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
      
    })

  }

  ngOnDestroy() {
    console.log('component rankingService destroyed');
    //this.rankingServiceSubscribtion.unsubscribe();
    this.dataSource = null;
  }

}
