import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  starTypeData = './assets/csv/starTypeData.csv';
  signTypeData = './assets/csv/signTypeData.csv';
  houseTypeData = './assets/csv/houseTypeData.csv';
  planetTypeData = './assets/csv/planetTypeData.csv';

  constructor(private http: HttpClient) { }

  getStarTypeInfo() {
    return this.http.get(this.starTypeData, { responseType: 'text' });
  }

  getSignTypeInfo() {
    return this.http.get(this.signTypeData, { responseType: 'text' });
  }

  getHouseTypeInfo() {
    return this.http.get(this.houseTypeData, { responseType: 'text' });
  }

  getPlanetTypeInfo() {
    return this.http.get(this.planetTypeData, { responseType: 'text' });
  }
}