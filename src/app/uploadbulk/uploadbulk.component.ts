import { Component, OnInit } from '@angular/core';
import { CsvreaderService } from 'src/services/csvreader.service';
import { SignService } from 'src/services/sign.service';

@Component({
  selector: 'app-uploadbulk',
  templateUrl: './uploadbulk.component.html',
  styleUrls: ['./uploadbulk.component.css']
})
export class UploadbulkComponent implements OnInit {
  cols: any[];
  dataList: any;
  Data: any[]=[];
  constructor(private csvService:CsvreaderService, private signService:SignService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'sign', header: 'Sign' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];
    this.read_All_Data();
  }

  read_All_Data() {
    this.signService.read_All_Signs().subscribe(data => {
      this.dataList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          sign: e.payload.doc.data()['sign'],
          type: e.payload.doc.data()['type'],
          value: e.payload.doc.data()['value'],
        };
      })
    });
  }

  upload_Bulk(){
    this.csvService.getDataInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.Data.push(e);
      });
    });
    setTimeout(() => this.uploadtoCloud(), 3000);
  }

  uploadtoCloud(){
    let record = {};
    var typesArray = this.Data[0].split(',');
    console.log(typesArray);
    for (var i = 1; i < this.Data.length; i++) { 
      var valuesArray = this.Data[i].split(',');
      record['sign'] = valuesArray[0];
      record['type'] = typesArray[i];
      record['value'] = valuesArray[i];
      //console.log(starArray);
      for (var j = 1; j < valuesArray.length; j++) { 
        record['sign'] = valuesArray[0];
        record['type'] = typesArray[j];
        record['value'] = valuesArray[j];
        //console.log(record['star'] + " " + record['type']+ " " + record['value']);
        this.signService.create_Sign(record).then(resp => {
          console.log('success');
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }

}
