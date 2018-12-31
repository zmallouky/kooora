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
import { LoginComponent } from './auth//login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatchSavedComponent } from './match/match-saved/match-saved.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MatchListComponent,
    MatchSavedComponent,
    RankingComponent,
    TestMatTableComponent,
    LoginComponent,
    SignupComponent
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
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
