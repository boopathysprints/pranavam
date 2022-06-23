import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/services/general.service';
import { StarService } from 'src/services/star.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class StarComponent implements OnInit {

  cols: any[];
  starList: any;
  star: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedStar: any;
  selecteForEditorDel: Boolean = false;
  allStars: any;
  allValues: any;

  @ViewChild('StarTable') StarTable: Table | undefined;

  constructor(private starService: StarService, private confirmationService: ConfirmationService, private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'star', header: 'Star' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_Star();
    this.allStars = this.generalService.get_All_Stars();
    this.allValues = this.generalService.get_All_Values();
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedStar.id;
    this.star = this.selectedStar.star;
    this.type = this.selectedStar.type;
    this.value = this.selectedStar.value;
    this.selecteForEditorDel = true;
  }


  cancel_Star() {
    this.selectedStar = null;
    this.star = '';
    this.type = '';
    this.value = '';
    this.selecteForEditorDel = false;
  }

  get_All_Stars() {

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
    record['type'] = this.type;
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
    record['type'] = this.type;
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

}
