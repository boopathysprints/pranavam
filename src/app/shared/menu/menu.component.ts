import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/interfaces/menuitem.interface';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [{ name: "Dashboard", icon: "sliders", link: "dashboard" },
                            { name: "Star", icon: "activity", link: "star" },
                          { name: "Sign", icon: "activity", link: "sign" },
                          { name: "Upload", icon: "activity", link: "upload" },
                          
                        ];
  selectedItem: string = "Dashboard";
  
  canShow:boolean = false;
  
  constructor(private _authService: AuthenticationService) {
    this._authService.isAuthExpose.subscribe(status => this.canShow = status);
  }
  ngOnInit(): void {
  }

  listClick(event, newValue) {
    this.selectedItem = newValue.name;
  }

}