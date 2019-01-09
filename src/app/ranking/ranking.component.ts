import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

import { IRanking } from './ranking.model';
import { RankingService } from './ranking.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  rankingServiceSubscribtion: Subscription;
  scorersSubscribtion: Subscription;
  idLeague: string;
  isLoading: boolean;
  scorers: any[];
  goals;

  constructor(private rankingService: RankingService, private route: ActivatedRoute) { };

  displayedColumns: string[] = ['position', 'teamname', 'played', 'w',
    'd', 'l', 'gf', 'ga', 'pts'];
  dataSource = new MatTableDataSource([]);
 

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      //this.dataSource = null;
      this.idLeague = params['league'];
      this.rankingServiceSubscribtion = this.rankingService.getRanking(this.idLeague).subscribe((ranking: IRanking[]) => {
          this.dataSource = new MatTableDataSource(ranking);
          this.dataSource.sort = this.sort;
          this.isLoading = false;
      });
      this.scorersSubscribtion = this.rankingService.getScorersRanking().subscribe( (scorers:any[]) => {
       
       let scorer = scorers[0];
       this.goals = scorer;
        this.scorers = Object.keys(scorers[0]);

        console.log(this.scorers[0] +" "+scorer[this.scorers[0]]);
        
        
        
        
        
      })
    })
  }


  ngOnDestroy() {
    console.log('component rankingService destroyed');
    this.rankingServiceSubscribtion.unsubscribe();
    this.dataSource = null;
  }
}
