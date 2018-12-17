import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

import { IRanking } from './ranking.model';
import { RankingService } from './ranking.service';


const ELEMENT_DATA: IRanking[] = [
  {position: '1', teamname: 'Barcelone', played: '16', w: '9',
     d: '4', l: '5', gf: '133', ga: '59', pts: '40'},

];

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  ranking : IRanking[] = [];
  rankingServiceSubscribtion : Subscription;
  constructor( public rankingService: RankingService) {};

  displayedColumns: string[] = ['Position', 'Team', 'Played', 'W',
  'D', 'L', 'GF', 'GA', 'Pts'];

  dataSource: MatTableDataSource<IRanking>;
  @ViewChild(MatSort) sort: MatSort;



  ngOnInit() {
      this.rankingServiceSubscribtion =this.rankingService.getRanking().subscribe((ranking:any[])=> {
        
          console.log("retour service=>" + ranking);
          ranking.forEach(ranking=> console.log(ranking));
          this.ranking = ranking;
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log("dataSource=>" + this.dataSource.data);
          this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.rankingServiceSubscribtion.unsubscribe();
  }
}
