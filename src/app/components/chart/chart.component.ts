import { Component, OnInit } from '@angular/core';
import { innerhouseclass } from 'src/app/constants/houseclasslinks';
import { houseorder } from 'src/app/constants/houseorder';
import { PlanetPosition } from 'src/interfaces/planetposition.interface'
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  aries_outer: string;
  tarus_outer: string;
  gemini_outer: string;
  cancer_outer: string;
  leo_outer: string;
  virgo_outer: string;
  libra_outer: string;
  scorpion_outer: string;
  sagittarius_outer: string;
  capricon_outer: string;
  aquarius_outer: string;
  pisces_outer: string;


  aries_inner: string;
  tarus_inner: string;
  gemini_inner: string;
  cancer_inner: string;
  leo_inner: string;
  virgo_inner: string;
  libra_inner: string;
  scorpion_inner: string;
  sagittarius_inner: string;
  capricon_inner: string;
  aquarius_inner: string;
  pisces_inner: string;

  indextoaries: number = 1;

  planet: string;
  ASC: string;
  planetpositions: PlanetPosition[] = [];
  housedetails: any[] = [];

  previoushouse: number = 1;
  houseorder: any[]=[];

  signdata: any[] = ['Aries', 'Tarus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpion', 'Sagittarius', 'Capricon', 'Aquarius', 'Pisces'];
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
   
  }

  checkAstro(value) {
    const previousselectedhouse = this.housedetails.filter(house => house.order == this.previoushouse)[0].sign;
    this.removehighlightcell(previousselectedhouse);
    
    this.houseorder = [...houseorder];
    const selectedhouse = this.housedetails.filter(house => house.order == value)[0].sign;
    this.highlightcell(selectedhouse);
    this.previoushouse = value;
  }


  addtochart() {
    const planets = this.planet.split(/\r\n|\r|\n/);

    planets.forEach(p => {
      p = p.replace(" [R]", "[R]");
      const details = p.split(/(\s+)/);

      if (details[0].indexOf('ASC') >= 0) {
        this.ASC = details[2];
        this.indextoaries = innerhouseclass.filter(cell => cell.house == this.ASC)[0].indextoaries;
        this.highlightcell(this.ASC);
      }

      if (details[0].indexOf('Uran') < 0 && details[0].indexOf('Nept') < 0 && details[0].indexOf('Plut') < 0) {
        this.planetpositions.push({
          planet: details[0],
          house: details[2],
          star: details[6],
          leg: details[8],
          degree: details[4]
        });
      }
    });

    this.signdata.forEach(sign => {
      this.housedetails.push({
        sign: sign,
        order: this.indextoaries,
        planets: this.calculateposition(sign)
      });
      if (this.indextoaries < 12) {
        this.indextoaries += 1;
      } else {
        this.indextoaries = 1;
      }
    });

    this.drawchart();
    this.checkAstro(1);
  }

  highlightcell(house: string) {
    const housetohighlight = innerhouseclass.filter(cell => cell.house == house)[0].class;
    const el = document.getElementById(housetohighlight);
    el.style.cssText = ` background-color: #F7DB6A`;
  }

  removehighlightcell(house: string) {
    const housetohighlight = innerhouseclass.filter(cell => cell.house == house)[0].class;
    const el = document.getElementById(housetohighlight);
    el.style.cssText = `background-color: #ffffff`;
  }

  drawchart() {
    this.aries_inner = this.calculateposition('Aries');
    this.tarus_inner = this.calculateposition('Tarus');
    this.gemini_inner = this.calculateposition('Gemini');
    this.cancer_inner = this.calculateposition('Cancer');
    this.leo_inner = this.calculateposition('Leo');
    this.virgo_inner = this.calculateposition('Virgo');
    this.libra_inner = this.calculateposition('Libra');
    this.scorpion_inner = this.calculateposition('Scorpion');
    this.sagittarius_inner = this.calculateposition('Sagittarius');
    this.capricon_inner = this.calculateposition('Capricon');
    this.aquarius_inner = this.calculateposition('Aquarius');
    this.pisces_inner = this.calculateposition('Pisces');
  }

  calculateposition(house: string) {
    const HousePlanets = this.planetpositions.filter(
      position => position.house === house);

    HousePlanets.sort((a, b) => {
      if (a.degree > b.degree) {
        return 1;
      } else if (a.degree < b.degree) {
        return -1;
      } else {
        return 0;
      }
    });

    return HousePlanets.map(it => it.planet).join(' ');
  }
}
