import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MatchListComponent } from './match/match-list/match-list.component';
import { RankingComponent } from './ranking/ranking.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatchSavedComponent } from './match/match-saved/match-saved.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: MatchListComponent },
  { path: 'todayMatch/:league', component: MatchListComponent },
  { path: 'ligaRank/:league', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'favorite', component: MatchSavedComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
