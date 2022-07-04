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
                            { name: "Star", icon: "star", link: "star" },
                          { name: "Sign", icon: "activity", link: "sign" },
                          { name: "House", icon: "home", link: "house" },
                          { name: "Planet", icon: "sun", link: "planet" },
                          { name: "Planet-In-Star", icon: "sunrise", link: "planetinstar" },
                          { name: "Planet-In-Sign", icon: "sunset", link: "planetinsign" },
                          { name: "Planet-In-House", icon: "archive", link: "planetinhouse" },
                          { name: "Planet-as-Lord", icon: "codepen", link: "planetaslord" },
                          { name: "Lord-In-Sign", icon: "airplay", link: "lordinsign" },
                          { name: "Lord-In-House", icon: "at-sign", link: "lordinhouse" },
                          { name: "Sign-as-House", icon: "command", link: "signashouse" },
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