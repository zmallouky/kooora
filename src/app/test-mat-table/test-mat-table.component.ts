import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';


import { IRanking } from '../ranking/ranking.model';
import { RankingService } from '../ranking/ranking.service';

export interface PeriodicElement {
  id?: String,
  position?: String;
  teamname?: String;
  played?: String;
  w?: String;
  d?: String;
  l?: String;
  gf?: String;
  ga?: String;
  pts?: String;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: '1', teamname: 'Barcelone', played: '16', w: '9',
    d: '4', l: '5', gf: '133', ga: '59', pts: '40'
  },
];

@Component({
  selector: 'app-test-mat-table',
  templateUrl: './test-mat-table.component.html',
  styleUrls: ['./test-mat-table.component.css']
})
export class TestMatTableComponent implements OnInit, OnDestroy {

  rankingServiceSubscribtion: Subscription;

  constructor(public rankingService: RankingService) { };

  displayedColumns: string[] = ['position', 'teamname', 'played', 'w',
    'd', 'l', 'gf', 'ga', 'pts'];
  dataSource: MatTableDataSource<IRanking>;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.rankingServiceSubscribtion = this.rankingService.getRanking().subscribe((ranking: any[]) => {

      console.log("retour service=>" + ranking);
      ranking.forEach(ranking => console.log(ranking));
      this.dataSource = new MatTableDataSource(ranking);
      console.log("dataSource=>" + this.dataSource.data);
      this.dataSource.sort = this.sort;
    });
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.rankingServiceSubscribtion.unsubscribe();
  }
}
