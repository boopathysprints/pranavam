import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { UserService } from 'src/services/user.service';
import {MessageService} from 'primeng/api';
import { SignashouseService } from 'src/services/signashouse.service';
import { SignService } from 'src/services/sign.service';
import { StarService } from 'src/services/star.service';
import { PlanetinsignService } from 'src/services/planetinsign.service';
import { PlanetinstarService } from 'src/services/planetinstar.service';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css'],
  providers: [MessageService]
})
export class BasicsComponent implements OnInit {
  signData: any[] = [];
  starData: any[] = [];
  
  signs: any[] = [];
  stars: any[] = [];

  lagnamData: any;
  lagnamSignData: any;
  rasiSignData: any;
  rasiData: any;
  starGenData:any;
  starMoonData:any;

  lagnamSignDetails: any[] = [];
  rasiSignDetails: any[] = [];
  lagnamDetails: any[] = [];
  rasiDetails: any[] = [];
  starGenDetails: any[] = [];
  starMoonDetails: any[] = [];

  name: string;
  dob: string;
  tob: string;

  lagnam: string;
  rasi: string;
  star: string;
  

  constructor(private dbService: UserService,
    private generalService: GeneralService,
    private _signService: SignService,
    private _signashouseService: SignashouseService,
    private _planetinsignService: PlanetinsignService,
    private _starService: StarService,
    private _planetinstarService: PlanetinstarService,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
    this.get_Option1_Values();
    this.get_Option2_Values();
  }

  get_Option1_Values() {
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

  Save_Details() {
    let record = {};
    record['name'] = this.name.toUpperCase();
    record['dob'] = this.dob;
    record['tob'] = this.tob;
    this.dbService.create_Item(record).then(resp => {
      this.messageService.add({ severity: 'success', closable: false, summary: 'Item added', detail: "Item added to database" });
    })
      .catch(error => {
        this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
      });
  }

  ClearAll() {
    this.lagnam = '';
    this.rasi = '';
    this.lagnamSignDetails = [];
    this.rasiSignDetails = [];
    this.lagnamDetails = [];
    this.rasiDetails = [];
  }

  ClearChips() {
    this.lagnamDetails = [];
    this.lagnamSignDetails = [];
    this.rasiSignDetails = [];
    this.rasiDetails = [];
    this.starGenDetails = [];
    this.starMoonDetails = [];
  }

  Read_Items_Where() {
    this.ClearChips();
    
    if (this.lagnam != undefined && this.lagnam != '') {
      this._signService.read_Items_Where(this.lagnam).subscribe(data => {
        this.lagnamSignData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
      this._signashouseService.Read_For_Lagnam(this.lagnam).subscribe(data => {
        this.lagnamData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.rasi != undefined && this.rasi != '' && this.rasi != this.lagnam) {
      this._signService.read_Items_Where(this.rasi).subscribe(data => {
        this.rasiSignData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.rasi != undefined && this.rasi != '') {
      this._planetinsignService.Read_For_Rasi(this.rasi).subscribe(data => {
        this.rasiData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.star != undefined && this.star != '') {
      this._starService.read_Items_Where(this.star).subscribe(data => {
        this.starGenData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });

      this._planetinstarService.Read_For_Natchathiram(this.star).subscribe(data => {
        this.starMoonData = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    setTimeout(() => this.update_Values(), 2000);
  }

  update_Values() {
    if (this.lagnamSignData.length !=0) {
      this.lagnamSignDetails = [];
      this.lagnamSignData.forEach(element => {
        if (this.lagnamSignDetails.indexOf(element.value) === -1) {
          this.lagnamSignDetails.push(element.value)
        }
      }
      );
    }
    if (this.lagnamData.length !=0) {
      this.lagnamDetails = [];
      this.lagnamData.forEach(element => {
        if (this.lagnamDetails.indexOf(element.value) === -1) {
          this.lagnamDetails.push(element.value)
        }
      }
      );
    }

    if (this.rasiSignData.length !=0) {
      this.rasiSignDetails = [];
      this.rasiSignData.forEach(element => {
        if (this.rasiSignDetails.indexOf(element.value) === -1) {
          this.rasiSignDetails.push(element.value)
        }
      }
      );
    }

    if (this.rasiData.length !=0) {
      this.rasiDetails = [];
      this.rasiData.forEach(element => {
        if (this.rasiDetails.indexOf(element.value) === -1) {
          this.rasiDetails.push(element.value)
        }
      }
      );
    }

    if (this.starGenData.length !=0) {
      this.starGenDetails = [];
      this.starGenData.forEach(element => {
        if (this.starGenDetails.indexOf(element.value) === -1) {
          this.starGenDetails.push(element.value)
        }
      }
      );
    }

    if (this.starMoonData.length !=0) {
      this.starMoonDetails = [];
      this.starMoonData.forEach(element => {
        if (this.starMoonDetails.indexOf(element.value) === -1) {
          this.starMoonDetails.push(element.value)
        }
      }
      );
    }
  }
}