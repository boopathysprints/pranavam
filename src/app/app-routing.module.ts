import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LordinhouseComponent } from './components/lordinhouse/lordinhouse.component';
import { MainComponent } from './shared/main/main.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: DashboardComponent},
    {path: 'pranavam/lordinhouse', component: LordinhouseComponent},
    {path: '**', redirectTo: 'pages/notfound'},
])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
