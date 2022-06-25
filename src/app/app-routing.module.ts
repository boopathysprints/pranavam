import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HouseComponent } from './components/house/house.component';
import { SignComponent } from './components/sign/sign.component';
import { StarComponent } from './components/star/star.component';
import { MainComponent } from './shared/main/main.component';
import { SigninComponent } from './shared/signin/signin.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'pranavam', component: MainComponent, canActivate : [AuthGuard], 
    children:[
      {path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard]},
      {path: 'sign', component: SignComponent, canActivate : [AuthGuard]},
      {path: 'house', component: HouseComponent, canActivate : [AuthGuard]},
      {path: 'star', component: StarComponent, canActivate : [AuthGuard]},
    ]},
    {path: '', component: SigninComponent},
    {path: 'login', component: SigninComponent},
    {path: '**', redirectTo: 'pages/notfound'},
])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
