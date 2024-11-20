import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { IRanking } from './ranking.model';
import { RankingService } from './ranking.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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
  League: string;
  Logo: string;

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

      if(this.idLeague == '152'){ this.League = 'ENGLAND'; this.Logo = 'england'}
      if(this.idLeague == '302'){ this.League = 'SPANISH'; this.Logo = 'spain'}
      if(this.idLeague == '127'){ this.League = 'FRANCE'; this.Logo = 'france'}
      this.rankingServiceSubscribtion = this.rankingService.getRanking(this.idLeague).subscribe((ranking: IRanking[]) => {
          this.dataSource = new MatTableDataSource(ranking);
          this.dataSource.sort = this.sort;
          this.isLoading = false;
      });
    })
  }


  ngOnDestroy() {
    console.log('component rankingService destroyed');
    this.rankingServiceSubscribtion.unsubscribe();
    this.dataSource = null;
  }
}
