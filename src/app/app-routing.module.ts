import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HouseComponent } from './components/house/house.component';
import { LordinhouseComponent } from './components/lordinhouse/lordinhouse.component';
import { LorninsignComponent } from './components/lorninsign/lorninsign.component';
import { PlanetComponent } from './components/planet/planet.component';
import { PlanetaslordComponent } from './components/planetaslord/planetaslord.component';
import { PlanetinhouseComponent } from './components/planetinhouse/planetinhouse.component';
import { PlanetinsignComponent } from './components/planetinsign/planetinsign.component';
import { PlanetinstarComponent } from './components/planetinstar/planetinstar.component';
import { SignComponent } from './components/sign/sign.component';
import { SignashouseComponent } from './components/signashouse/signashouse.component';
import { StarComponent } from './components/star/star.component';
import { MainComponent } from './shared/main/main.component';
import { SigninComponent } from './shared/signin/signin.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'pranavam', component: MainComponent, canActivate : [AuthGuard], 
    children:[
      {path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard]},
      {path: 'star', component: StarComponent, canActivate : [AuthGuard]},
      {path: 'sign', component: SignComponent, canActivate : [AuthGuard]},
      {path: 'house', component: HouseComponent, canActivate : [AuthGuard]},
      {path: 'planet', component: PlanetComponent, canActivate : [AuthGuard]},
      {path: 'planetinsign', component: PlanetinsignComponent, canActivate : [AuthGuard]},
      {path: 'planetinhouse', component: PlanetinhouseComponent, canActivate : [AuthGuard]},
      {path: 'planetinstar', component: PlanetinstarComponent, canActivate : [AuthGuard]},
      {path: 'planetaslord', component: PlanetaslordComponent, canActivate : [AuthGuard]},
      {path: 'lordinsign', component: LorninsignComponent, canActivate : [AuthGuard]},
      {path: 'lordinhouse', component: LordinhouseComponent, canActivate : [AuthGuard]},
      {path: 'signashouse', component: SignashouseComponent, canActivate : [AuthGuard]},
    ]},
    {path: '', component: SigninComponent},
    {path: 'login', component: SigninComponent},
    {path: '**', redirectTo: 'pages/notfound'},
])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
