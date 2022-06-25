import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvreaderService {
starData ='./assets/csv/starData.csv';
  constructor(private http: HttpClient) { }

  getStarInfo() {
    return this.http.get(this.starData, {responseType: 'text'});
    }
}
