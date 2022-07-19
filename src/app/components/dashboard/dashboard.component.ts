import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { HouseService } from 'src/services/house.service';
import { LordinhouseService } from 'src/services/lordinhouse.service';
import { PlanetinhouseService } from 'src/services/planetinhouse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  houseData: any[] = [];
  signData: any[] = [];
  planetData: any[] = [];
  houses: any[] = [];
  signs: any[] = [];
  planets: any[] = [];

  lordinhouseData: any;
  planetinhouseData: any;
  actualhouseData: any;
  placedhouseData: any;

  lordinhouseDetails: any[] = [];
  planetinhouseDetails: any[] = [];
  actualhouseDetails: any[] = [];
  placedhouseDetails: any[] = [];

  lagnam: string;
  rasi: string;
  actualHouse: string;
  actualHouseSign: string;
  actualHouseLord: string;
  placedHouse: string;
  placedHouseSign: string;

  visible: boolean = false;

  constructor(private generalService: GeneralService,
    private _lordinhouseService: LordinhouseService,
    private _planetinhouseService: PlanetinhouseService,
    private _houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.get_Option1_Values();
    this.get_Option2_Values();
    this.get_Option3_Values();
  }

  get_Option1_Values() {
    this.houses.push({ name: '', value: '' });
    this.generalService.getHouseTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.houseData.push(e);
      });
      var valuesArray = this.houseData[0].split(',');
      valuesArray.forEach(element => this.houses.push({ name: element, value: element }));
    });
  }

  get_Option2_Values() {
    this.signs.push({ name: '', value: '' });
    this.generalService.getSignTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.signData.push(e);
      });
      var valuesArray = this.signData[0].split(',');
      valuesArray.forEach(element => this.signs.push({ name: element, value: element }));
    });
  }

  get_Option3_Values() {
    this.planets.push({ name: '', value: '' });
    this.generalService.getPlanetTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.planetData.push(e);
      });
      var valuesArray = this.planetData[0].split(',');
      valuesArray.forEach(element => this.planets.push({ name: element, value: element }));
    });
  }

  ClearAll() {
    this.lagnam = '';
    this.rasi = '';
    this.actualHouse = '';
    this.actualHouseSign = '';
    this.actualHouseLord = '';
    this.placedHouse = '';
    this.placedHouseSign = '';
    this.lordinhouseDetails = [];
    this.planetinhouseDetails = [];
    this.actualhouseDetails = [];
    this.placedhouseDetails = [];
  }

  ClearChips() {
    this.lordinhouseDetails = [];
    this.planetinhouseDetails = [];
    this.actualhouseDetails = [];
    this.placedhouseDetails = [];
  }

  read_Items_Where() {
    this.ClearChips();
    if (this.actualHouse != undefined && this.actualHouse != '') {
      this._houseService.read_Items_Where(this.actualHouse).subscribe(data => {
        this.actualhouseData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.placedHouse != undefined && this.placedHouse != '') {
      this._houseService.read_Items_Where(this.placedHouse).subscribe(data => {
        this.placedhouseData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.actualHouse != undefined && this.actualHouse != '' && this.placedHouse != undefined && this.placedHouse != '') {
      this._lordinhouseService.read_Items_Where(this.actualHouse, this.placedHouse).subscribe(data => {
        this.lordinhouseData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.actualHouseLord != undefined && this.actualHouseLord != '' && this.placedHouse != undefined && this.placedHouse != '') {
      this._planetinhouseService.read_Items_Where(this.actualHouseLord, this.placedHouse).subscribe(data => {
        this.planetinhouseData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }
    setTimeout(() => this.update_Values(), 2000);
  }

  update_Values() {
    if (this.actualHouse != undefined && this.actualHouse != '') {
      this.actualhouseDetails = [];
      this.actualhouseData.forEach(element => {
        if (this.actualhouseDetails.indexOf(element.value) === -1) {
          this.actualhouseDetails.push(element.value)
        }
      }
      );
    }
    if (this.placedHouse != undefined && this.placedHouse != '' && this.actualHouse != this.placedHouse) {
      this.placedhouseDetails = [];
      this.placedhouseData.forEach(element => {
        if (this.placedhouseDetails.indexOf(element.value) === -1) {
          this.placedhouseDetails.push(element.value)
        }
      }
      );
    }
    if (this.actualHouse != undefined && this.actualHouse != '' && this.placedHouse != undefined && this.placedHouse != '') {
      this.lordinhouseDetails = [];
      this.lordinhouseData.forEach(element => {
        if (this.lordinhouseDetails.indexOf(element.value) === -1) {
          this.lordinhouseDetails.push(element.value)
        }
      }
      );
    }

    if (this.actualHouseLord != undefined && this.actualHouseLord != '' && this.placedHouse != undefined && this.placedHouse != '') {
      this.planetinhouseDetails = [];
      this.planetinhouseData.forEach(element => {
        if (this.planetinhouseDetails.indexOf(element.value) === -1) {
          this.planetinhouseDetails.push(element.value)
        }
      }
      );
    }
  }
}