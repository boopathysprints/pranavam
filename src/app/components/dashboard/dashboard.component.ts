import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
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

  tableData: any;
  chip1s: any[] = [];

  option1Selected: string;
  option2Selected: string;

  visible: boolean = false;

  constructor(private generalService: GeneralService, private dbService: SignashouseService) { }

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
    this.dbService.read_Items_Where(this.option1Selected, this.option2Selected).subscribe(data => {
      this.tableData = data.map(e => {
        return {
          // id: e.payload.doc.id,
          // sign: e.payload.doc.data()['sign'],
          // house: e.payload.doc.data()['house'],
          value: e.payload.doc.data()['value']
        };
      })
    });
    setTimeout(() => this.update_Values(), 2000);
  }

  update_Values() {
    this.chip1s = [];
    this.tableData.forEach(element => {
      if(this.chip1s.indexOf(element.value) === -1) {
        this.chip1s.push(element.value)
      }
    }
    );
  }
}
