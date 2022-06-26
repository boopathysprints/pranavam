import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GeneralService } from 'src/services/general.service';
import { PlanetService } from 'src/services/planet.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  cols: any[];
  planetTypeData: any[]=[];
  planetList: any;
  planet: string;
  type: string;
  value: string;
  csvalues: string;
  idToEditorDelete: string;
  selectedPlanet: any;
  selecteForEditorDel: Boolean = false;
  allPlanets: any[]=[];
  allValues: any[]=[];

  @ViewChild('PlanetTable') PlanetTable: Table | undefined;

  constructor(private planetService: PlanetService, private confirmationService: ConfirmationService, private messageService: MessageService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'planet', header: 'Planet' },
      { field: 'type', header: 'Type' },
      { field: 'value', header: 'Value' }
    ];

    this.read_All_Planet();
    this.get_Planet_Type_Values();
    
 
  }

  get_Planet_Type_Values(){
    this.generalService.getPlanetTypeInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.planetTypeData.push(e);
      });
    });
    setTimeout(() => this.update_Planet_Type_Values(), 3000);
  }

  update_Planet_Type_Values(){
    var signArray = this.planetTypeData[0].split(',');
    var typeArray = this.planetTypeData[1].split(',');
    signArray.forEach(planet=> this.allPlanets.push({ name: planet, value: planet }));
    typeArray.forEach(type=> {
      if(type && type != '')
      this.allValues.push({ name: type, value: type })});;
  }

  onRowSelect(event) {
    this.idToEditorDelete = this.selectedPlanet.id;
    this.planet = this.selectedPlanet.Planet;
    this.type = this.selectedPlanet.type;
    this.value = this.selectedPlanet.value;
    this.selecteForEditorDel = true;
  }


  cancel_Planet() {
    this.selectedPlanet = null;
    this.planet = '';
    this.type = '';
    this.value = '';
    this.selecteForEditorDel = false;
  }

  get_All_Planets() {

  }

  read_All_Planet() {
    this.planetService.read_All_Planets().subscribe(data => {
      this.planetList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          planet: e.payload.doc.data()['planet'],
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
        this.Delete_Planet();
        //this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        this.cancel_Planet();
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  create_Planet() {
    let record = {};
    record['planet'] = this.planet;
    record['type'] = this.type;
    var valuesArray = this.csvalues.split(',');
    for (var i = 0; i < valuesArray.length; i++) {
      record['value'] = valuesArray[i];
      this.planetService.create_Planet(record).then(resp => {
        console.log('success');
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', closable: false, summary: 'some error occured', detail: error });
      });
    }
    this.messageService.add({ severity: 'success', closable: false, summary: 'Planet added', detail: "planet added to database" });
    this.cancel_Planet();
  }

  Update_Planet() {
    let record = {};
    record['planet'] = this.planet;
    record['type'] = this.type;
    record['value'] = this.value;
    this.planetService.update_Planet(this.idToEditorDelete, record);

    this.messageService.add({ severity: 'success', closable: false, summary: 'Planet updated', detail: this.selectedPlanet.id + " is updated" });
    this.cancel_Planet();
  }

  Delete_Planet() {
    this.planetService.delete_Planet(this.idToEditorDelete);
    
    this.messageService.add({ severity: 'success', closable: false, summary: 'Planet deleted', detail: this.selectedPlanet.id + " is deleted" });
    this.cancel_Planet();
  }

}
