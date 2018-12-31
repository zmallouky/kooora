import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MatchListComponent } from './match/match-list/match-list.component';
import { RankingComponent } from './ranking/ranking.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatchSavedComponent } from './match/match-saved/match-saved.component';

const routes: Routes = [
  { path: '', component: MatchListComponent },
  { path: 'ligaRank', component: RankingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'favorite', component: MatchSavedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
