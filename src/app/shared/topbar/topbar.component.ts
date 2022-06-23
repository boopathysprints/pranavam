import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  signOut() {
    
    this._authService.SignOut();
  }

}