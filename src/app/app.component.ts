import { Component, OnInit } from '@angular/core';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { LordInHouse } from 'src/interfaces/lordinhouse.interface';

import { LordInHouseService } from 'src/services/lordinhouse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
  

}
