import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

import { IRanking } from './ranking.model';
import { RankingService } from './ranking.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  ranking : IRanking[] = [];
  rankingServiceSubscribtion : Subscription;
  constructor( public postService: RankingService) {};
  
  ngOnInit() {
      this.rankingServiceSubscribtion =this.postService.getRanking().subscribe((ranking:any[])=> {
          console.log("retour service=>" + ranking);
          this.ranking = ranking;
      });
      this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ranking);

  @ViewChild(MatSort) sort: MatSort;


  ngOnDestroy() {
    this.rankingServiceSubscribtion.unsubscribe();
  }
}
