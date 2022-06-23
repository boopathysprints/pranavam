import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  canShow:boolean = false;
  constructor(private _authService: AuthenticationService) {
    this._authService.isAuthExpose.subscribe(status => this.canShow = status);
  }

  ngOnInit(): void {
  }

}
