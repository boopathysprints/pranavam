import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { GeneralService } from 'src/services/general.service';
import { LordinhouseService } from 'src/services/lordinhouse.service';
import { PlanetinhouseService } from 'src/services/planetinhouse.service';
import { SignashouseService } from 'src/services/signashouse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  op1Data: any[] = [];
  op2Data: any[] = [];
  op3Data: any[] = [];
  allOp1s: any[] = [];
  allOp2s: any[] = [];
  allOp3s: any[] = [];

  tableData1: any;
  tableData2: any;
  tableData3: any;
  chip1s: any[] = [];
  chip2s: any[] = [];
  chip3s: any[] = [];

  option1Selected: string;
  option2Selected: string;
  option3Selected: string;
  option4Selected: string;

  visible: boolean = false;

  constructor(private generalService: GeneralService,
    private db2Service: LordinhouseService,
    private db3Service: PlanetinhouseService
  ) { }

  ngOnInit(): void {

    this.get_Option1_Values();
    this.get_Option2_Values();
    this.get_Option3_Values();
  }


  get_Option1_Values() {
    this.generalService.getHouseTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.op1Data.push(e);
      });
      var valuesArray = this.op1Data[0].split(',');
      valuesArray.forEach(element => this.allOp1s.push({ name: element, value: element }));
    });
  }


  get_Option2_Values() {
    this.generalService.getSignTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.op2Data.push(e);
      });
      var valuesArray = this.op2Data[0].split(',');
      valuesArray.forEach(element => this.allOp2s.push({ name: element, value: element }));
    });
  }

  get_Option3_Values() {
    this.generalService.getPlanetTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.op3Data.push(e);
      });
      var valuesArray = this.op3Data[0].split(',');
      valuesArray.forEach(element => this.allOp3s.push({ name: element, value: element }));
    });
  }



  read_Items_Where() {

    if (this.option1Selected != undefined && this.option3Selected != undefined) {
      this.db2Service.read_Items_Where(this.option1Selected, this.option3Selected).subscribe(data => {
        this.tableData2 = data.map(e => {
          return {
            // id: e.payload.doc.id,
            // sign: e.payload.doc.data()['sign'],
            // house: e.payload.doc.data()['house'],
            value: e.payload.doc.data()['value']
          };
        })
      });
    }

    if (this.option4Selected != undefined && this.option3Selected != undefined) {
      this.db3Service.read_Items_Where(this.option4Selected, this.option3Selected).subscribe(data => {
        this.tableData3 = data.map(e => {
          return {
            value: e.payload.doc.data()['value']
          };
        })
      });
    }



    setTimeout(() => this.update_Values(), 2000);
  }

  update_Values() {
    if (this.option1Selected != undefined && this.option3Selected != undefined) {
      this.chip2s = [];
      this.tableData2.forEach(element => {
        if (this.chip2s.indexOf(element.value) === -1) {
          this.chip2s.push(element.value)
        }
      }
      );
    }

    this.chip3s = [];
    this.tableData3.forEach(element => {
      if (this.chip3s.indexOf(element.value) === -1) {
        this.chip3s.push(element.value)
      }
    }
    );

  }
}
