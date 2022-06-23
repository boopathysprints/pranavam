import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  get_All_Values(){
    var allValues = [
      { name: 'SYMBOL', value: 'symbol' },
      { name: 'STORY', value: 'story' },
      { name: 'COLOR', value: 'color' },
      { name: 'BODY PART', value: 'bodypart' },
    ];
   
    return allValues;
  }

  get_All_Stars(){
    var allStars = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allStars;
  }

  get_All_Signs(){
    var allSigns = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allSigns;
  }

  get_All_Planets(){
    var allPlanets = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allPlanets;
  }

  get_All_Houses(){
    var allHouses = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allHouses;
  }
}