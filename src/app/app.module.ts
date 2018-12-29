import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { 
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule, 
  MatExpansionModule,
  MatIconModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatchListComponent } from './match/match-list/match-list.component';
import { RankingComponent } from './ranking/ranking.component';
import { TestMatTableComponent } from './test-mat-table/test-mat-table.component';
import { LoginComponenet } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MatchListComponent,
    RankingComponent,
    TestMatTableComponent,
    LoginComponenet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
