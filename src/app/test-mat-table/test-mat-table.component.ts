import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: '4', name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: '2', name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: '1', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},

  {position: '3', name: 'Lithium', weight: 6.941, symbol: 'Li'},

];
@Component({
  selector: 'app-test-mat-table',
  templateUrl: './test-mat-table.component.html',
  styleUrls: ['./test-mat-table.component.css']
})
export class TestMatTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
