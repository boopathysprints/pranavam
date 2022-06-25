import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { empty } from 'rxjs';
import { CsvreaderService } from 'src/services/csvreader.service';
import { GeneralService } from 'src/services/general.service';
import { StarService } from 'src/services/star.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
  providers: [MessageService]
})
export class StarComponent implements OnInit {

  cols: any[];
  starTypeData: any[]=[];
  starList: any;
  star: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedStar: any;
  selecteForEditorDel: Boolean = false;
  allStars: any[]=[];
  allValues: any[]=[];
  filteredValues: any;

  @ViewChild('StarTable') StarTable: Table | undefined;

  constructor(private starService: StarService, private confirmationService: ConfirmationService, private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'star', header: 'Star' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_Star();
    this.get_Star_Type_Values();
  }

  get_Star_Type_Values(){
    this.generalService.getStarTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.starTypeData.push(e);
      });
    });
    setTimeout(() => this.update_Star_Type_Values(), 3000);
  }

  update_Star_Type_Values(){
    var starArray = this.starTypeData[0].split(',');
    var typeArray = this.starTypeData[1].split(',');
    starArray.forEach(star=> this.allStars.push({ name: star, value: star }));
    typeArray.forEach(type=> {
      if(type && type != '')
      this.allValues.push({ name: type, value: type })});;
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedStar.id;
    this.star = this.selectedStar.star;
    this.type = this.selectedStar.type;
    this.value = this.selectedStar.value;
    this.selecteForEditorDel = true;
  }

  filterValue(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.allValues.length; i++) {
      let value = this.allValues[i];
      if (value.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(value);
      }
    }
    this.filteredValues = filtered;
  }

  cancel_Star() {
    this.selectedStar = null;
    this.star = '';
    this.type = '';
    this.value = '';
    this.csvalues = '';
    this.selecteForEditorDel = false;
  }

  read_All_Star() {
    this.starService.read_All_Stars().subscribe(data => {
      this.starList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          star: e.payload.doc.data()['star'],
          type: e.payload.doc.data()['type'],
          value: e.payload.doc.data()['value'],
        };
      })
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.idToEditorDelete);
        this.Delete_Star();
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        this.cancel_Star();
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  

  create_Star() {
    let record = {};
    record['star'] = this.star;
     if(this.type['value']){
      record['type'] = this.type['value'];
    } else{
      record['type'] = this.type
    }
    var valuesArray = this.csvalues.split(',');
    for (var i = 0; i < valuesArray.length; i++) {
      record['value'] = valuesArray[i];
      this.starService.create_Star(record).then(resp => {
        console.log('success');
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
      });
    }
    this.messageService.add({ severity: 'success', closable: false, summary: 'Star added', detail: "Star added to database" });
    this.cancel_Star();
  }

  Update_Star() {
    let record = {};
    record['star'] = this.star;
    if (this.type['value']) {
      record['type'] = this.type['value'];
    } else {
      record['type'] = this.type
    }
    record['value'] = this.value;
    this.starService.update_Star(this.idToEditorDelete, record);

    this.messageService.add({ severity: 'success', closable: false, summary: 'Star updated', detail: this.selectedStar.id + " is updated" });
    this.cancel_Star();
  }

  Delete_Star() {
    this.starService.delete_Star(this.idToEditorDelete);

    this.messageService.add({ severity: 'success', closable: false, summary: 'Star deleted', detail: this.selectedStar.id + " is deleted" });
    this.cancel_Star();
  }

  /*

  upload_Stars(){
    this.csvService.getStarInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.starData.push(e);
      });
    });
    setTimeout(() => this.uploadtoCloud(), 4000);
  }

  uploadtoCloud(){
    let record = {};
    var typesArray = this.starData[0].split(',');
    console.log(typesArray);
    for (var i = 1; i < this.starData.length; i++) { 
      var starArray = this.starData[i].split(',');
      record['star'] = starArray[0];
      record['type'] = typesArray[i];
      record['value'] = starArray[i];
      //console.log(starArray);
      for (var j = 1; j < starArray.length; j++) { 
        record['star'] = starArray[0];
        record['type'] = typesArray[j];
        record['value'] = starArray[j];
        //console.log(record['star'] + " " + record['type']+ " " + record['value']);
        this.starService.create_Star(record).then(resp => {
          console.log('success');
        })
        .catch(error => {
          this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
        });
      }
    }
  }

  */

}
