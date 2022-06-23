import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
  }
  email: string;
  password: string;

  signIn() {
    this.authenticationService.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  

}

