import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

import { IRanking } from './ranking.model';
import { RankingService } from './ranking.service';

var ELEMENT_DATA: IRanking[] = [
  {position: '4', teamname: 'Beryllium', played: '12', w: '12',
   d: '4', l: '4', gf: '4', ga: '3', pts: '13'},
   {position: '2', teamname: 'Zeryllium', played: '13', w: '23',
   d: '4', l: '4', gf: '2', ga: '1', pts: '15'},
];

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  rankingServiceSubscribtion: Subscription;

  constructor(public rankingService: RankingService) { };

  displayedColumns: string[] = ['position', 'teamname', 'played', 'w',
    'd', 'l', 'gf', 'ga', 'pts'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
 

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.rankingServiceSubscribtion = this.rankingService.getRanking().subscribe((ranking: IRanking[]) => {

      //console.log("retour service=>" + ranking);
      //ranking.forEach(ranking => console.log(ranking));
      ELEMENT_DATA = ranking;
      
      //console.log("dataSource=>" + this.dataSource.data);
      //this.dataSource.sort = this.sort;
    });
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.rankingServiceSubscribtion.unsubscribe();
  }
}
