import { Component, OnInit } from '@angular/core';
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
  houseData: any[] = [];
  signData: any[] = [];
  planetData: any[] = [];
  starData: any[] = [];
  houses: any[] = [];
  signs: any[] = [];
  stars: any[] = [];
  planets: any[] = [];

  lordinhouseData: any;
  planetinhouseData: any;
  planetinstarData: any;
  actualhouseData: any;
  placedhouseData: any;
  actualhouseSignData: any;
  actualhouseLordData: any;
  placedhouseSignData: any;
  placedhouseStarData: any;

  lordinhouseDetails: any[] = [];
  planetinhouseDetails: any[] = [];
  planetinsstarDetails: any[] = [];
  actualhouseDetails: any[] = [];
  actualhouseLordDetails: any[] = [];
  placedhouseDetails: any[] = [];
  starDetails: any[] = [];
  actualhouseSignDetails: any[] = [];
  placedhouseSignDetails: any[] = [];
  planetinstarDetails: any[] = [];

  
  actualHouse: string;
  actualHouseSign: string;
  actualHouseLord: string;
  placedHouse: string;
  placedHouseSign: string;
  placedStar: string;

  visible: boolean = false;

  constructor(private generalService: GeneralService,
    private _lordinhouseService: LordinhouseService,
    private _planetinhouseService: PlanetinhouseService,
    private _houseService: HouseService,
    private _signService: SignService,
    private _planetinstarService: PlanetinstarService,
    private _starService: StarService,
    private _planetService:PlanetService
  ) { }

  ngOnInit(): void {
    this.get_House_Values();
    this.get_Sign_Values();
    this.get_Planet_Values();
    this.get_Star_Values();
  }

  get_House_Values() {
    if(this.houses.length == 0)
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

  get_Sign_Values() {
    if(this.signs.length == 0)
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

  get_Planet_Values() {
    if(this.planets.length == 0)
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

  get_Star_Values() {
    if(this.stars.length == 0)
      this.stars.push({ name: '', value: '' });
    this.generalService.getStarTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.starData.push(e);
      });
      var valuesArray = this.starData[0].split(',');
      valuesArray.forEach(element => this.stars.push({ name: element, value: element }));
    });
  }

  ClearAll() {
    this.placedStar ='';
    this.actualHouse = '';
    this.actualHouseSign = '';
    this.actualHouseLord = '';
    this.placedHouse = '';
    this.placedHouseSign = '';
    this.lordinhouseDetails = [];
    this.planetinhouseDetails = [];
    this.actualhouseDetails = [];
    this.placedhouseDetails = [];
    this.actualhouseSignDetails = [];
    this.placedhouseSignDetails = [];
    this.starDetails=[];
  }

  ClearChips() {
    this.lordinhouseDetails = [];
    this.planetinhouseDetails = [];
    this.actualhouseDetails = [];
    this.placedhouseDetails = [];
    this.actualhouseSignDetails = [];
    this.placedhouseSignDetails = [];
    this.starDetails=[];
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

    if (this.actualHouseLord != undefined && this.actualHouseLord != '') {
      this._planetService.read_Items_Where(this.actualHouseLord).subscribe(data => {
        this.actualhouseLordData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.actualHouseSign != undefined && this.actualHouseSign != '') {
      this._signService.read_Items_Where(this.actualHouseSign).subscribe(data => {
        this.actualhouseSignData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.placedHouseSign != undefined && this.placedHouseSign != '' && this.actualHouseSign != this.placedHouseSign) {
      this._signService.read_Items_Where(this.placedHouseSign).subscribe(data => {
        this.placedhouseSignData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.placedStar != undefined && this.placedStar != '') {
      this._starService.read_Items_Where(this.placedStar).subscribe(data => {
        this.starData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });

      this._planetinstarService.Read_For_Placement(this.actualHouseLord.trim(),this.placedStar).subscribe(data => {
       console.log(data)
        this.planetinstarData = data.map(e => {
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

    if (this.actualHouseSign != undefined && this.actualHouseSign != '') {
      this.actualhouseSignDetails = [];
      this.actualhouseSignData.forEach(element => {
        if (this.actualhouseSignDetails.indexOf(element.value) === -1) {
          this.actualhouseSignDetails.push(element.value)
        }
      }
      );
    }

    if (this.actualhouseLordData.length >0) {
      this.actualhouseLordDetails = [];
      this.actualhouseLordData.forEach(element => {
        if (this.actualhouseLordDetails.indexOf(element.value) === -1) {
          this.actualhouseLordDetails.push(element.value)
        }
      }
      );
    }

    if (this.placedHouseSign != undefined && this.placedHouseSign != '' && this.actualHouseSign != this.placedHouseSign) {
      this.placedhouseSignDetails = [];
      this.placedhouseSignData.forEach(element => {
        if (this.placedhouseSignDetails.indexOf(element.value) === -1) {
          this.placedhouseSignDetails.push(element.value)
        }
      }
      );
    }

    if (this.starData != undefined && this.starData.length >0) {
      this.starDetails = [];
      this.starData.forEach(element => {
        if (this.starDetails.indexOf(element.value) === -1) {
          this.starDetails.push(element.value)
        }
      }
      );
    }

    if (this.planetinstarData != undefined && this.planetinstarData.length >0) {
      this.planetinstarDetails = [];
      this.planetinstarData.forEach(element => {
        if (this.planetinstarDetails.indexOf(element.value) === -1) {
          this.planetinstarDetails.push(element.value)
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