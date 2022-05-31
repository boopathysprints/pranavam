import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/interfaces/menuitem.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems : MenuItem[] = [{name:"Dashboard",icon:"sliders",link:""},
                            {name:"Lord In House",icon:"user",link:"/pranavam/lordinhouse"}];
  selectedItem : string = "Dashboard";
  
  
  constructor() {
    
   }

  

  ngOnInit(): void {
  }

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue.name;  
    // don't forget to update the model here
    // ... do other stuff here ...
}

}
