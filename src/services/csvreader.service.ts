import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvreaderService {
starData ='./assets/csv/signData.csv';
  constructor(private http: HttpClient) { }

  getDataInfo() {
    return this.http.get(this.starData, {responseType: 'text'});
    }
}
