import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'src/services/auth.guard';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { MainComponent } from './shared/main/main.component';

import { MenuComponent } from './shared/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LordinhouseComponent } from './components/lordinhouse/lordinhouse.component';
import { HouseComponent } from './components/house/house.component';
import { PlanetComponent } from './components/planet/planet.component';
import { StarComponent } from './components/star/star.component';
import { PlanetaslordComponent } from './components/planetaslord/planetaslord.component';
import { PlanetinhouseComponent } from './components/planetinhouse/planetinhouse.component';
import { SignComponent } from './components/sign/sign.component';
import { SigninComponent } from './shared/signin/signin.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { PlanetinsignComponent } from './components/planetinsign/planetinsign.component';
import { PlanetinstarComponent } from './components/planetinstar/planetinstar.component';

import { LorninsignComponent } from './components/lorninsign/lorninsign.component';

//primeng

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadbulkComponent } from './uploadbulk/uploadbulk.component';
import { SignashouseComponent } from './components/signashouse/signashouse.component';
import { BasicsComponent } from './components/basics/basics.component';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    LordinhouseComponent,
    HouseComponent,
    PlanetComponent,
    StarComponent,
    PlanetaslordComponent,
    PlanetinhouseComponent,
    SigninComponent,
    TopbarComponent,
    SignComponent,
    PlanetinsignComponent,
    PlanetinstarComponent,
    LorninsignComponent,
    UploadbulkComponent,
    SignashouseComponent,
    BasicsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ChipModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule,
    InputTextModule,
    AutoCompleteModule
  ],
  providers: [AuthGuard, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
