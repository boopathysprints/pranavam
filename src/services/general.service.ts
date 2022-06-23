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
    var allstars = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
   
    return allstars;
  }
}
