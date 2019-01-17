import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MatchListComponent } from './match/match-list/match-list.component';
import { SwaggerApiComponent } from './swagger-api/swagger-api.component';
import { RankingComponent } from './ranking/ranking.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatchSavedComponent } from './match/match-saved/match-saved.component';
import { AuthGuard } from './auth/auth.guard';
import { ScorerComponent } from './scorer/scorer.component';
import { MatchLiveComponent } from './match/match-live/match-live.component';
import { PredictionComponent } from './prediction/prediction.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: MatchLiveComponent },
  { path: 'todayMatch/:league', component: MatchListComponent },
  { path: 'scorer/:league', component: ScorerComponent },
  { path: 'swaggerApi', component: SwaggerApiComponent },
  { path: 'prediction', component: PredictionComponent, canActivate: [AuthGuard] },
  { path: 'ligaRank/:league', component: RankingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'live', component: MatchLiveComponent},
  { path: 'favorite', component: MatchSavedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
