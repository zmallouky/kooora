import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponenet } from './login/login.component';
import { MatchListComponent } from './match/match-list/match-list.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  { path : '', component: MatchListComponent},
  { path : 'ligaRank', component: RankingComponent},
  { path : 'login', component: LoginComponenet}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
