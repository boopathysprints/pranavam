import { Component, Input, OnInit } from '@angular/core';
import { PlanetPosition } from 'src/interfaces/planetposition.interface';
import { GeneralService } from 'src/services/general.service';
import { HouseService } from 'src/services/house.service';
import { LordinhouseService } from 'src/services/lordinhouse.service';
import { PlanetService } from 'src/services/planet.service';
import { PlanetinhouseService } from 'src/services/planetinhouse.service';
import { PlanetinstarService } from 'src/services/planetinstar.service';
import { SignService } from 'src/services/sign.service';
import { StarService } from 'src/services/star.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() planetpositions: PlanetPosition[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}