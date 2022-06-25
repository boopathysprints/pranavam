import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  get_All_Values() {
    var allValues = [
      { name: 'SYMBOL', value: 'symbol' },
      { name: 'STORY', value: 'story' },
      { name: 'COLOR', value: 'color' },
      { name: 'BODY PART', value: 'bodypart' },
    ];

    return allValues;
  }

  get_All_Sign_Values() {
    var allValues = [
      { name: 'அதிபதி', value: 'அதிபதி' },
      { name: 'உருவம்', value: 'உருவம்' },
      { name: 'இயல்பு', value: 'இயல்பு' },
      { name: 'பஞ்சபூதம்', value: 'பஞ்சபூதம்' },
      { name: 'திசை', value: 'திசை' },
      { name: 'உறுப்பு', value: 'உறுப்பு' },
      { name: 'இடம்', value: 'இடம்' },
      { name: 'நிறம்', value: 'நிறம்' },
      { name: 'மனநிலை', value: 'மனநிலை' },
      { name: 'பாலினம்', value: 'பாலினம்' },
      { name: 'மாதம்', value: 'மாதம்' },
      { name: 'உயரம்', value: 'உயரம்' },
      { name: 'காலபுருஷனுக்கு', value: 'காலபுருஷனுக்கு' },
      { name: 'பாதகாதிபதி', value: 'பாதகாதிபதி' },
      { name: 'மற்றவை', value: 'மற்றவை'},
    ];

    return allValues;
  }

  get_All_Stars() {
    var allStars = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allStars;
  }

  get_All_Star_Values() {
    var allValues = [
      { name: 'அதிபதி', value: 'அதிபதி' },
      { name: 'உருவம்', value: 'உருவம்' },
      { name: 'இயல்பு', value: 'இயல்பு' },
      { name: 'பஞ்சபூதம்', value: 'பஞ்சபூதம்' },
      { name: 'திசை', value: 'திசை' },
      { name: 'உறுப்பு', value: 'உறுப்பு' },
      { name: 'இடம்', value: 'இடம்' },
      { name: 'நிறம்', value: 'நிறம்' },
      { name: 'மனநிலை', value: 'மனநிலை' },
      { name: 'பாலினம்', value: 'பாலினம்' },
      { name: 'மாதம்', value: 'மாதம்' },
      { name: 'உயரம்', value: 'உயரம்' },
      { name: 'காலபுருஷனுக்கு', value: 'காலபுருஷனுக்கு' },
      { name: 'பாதகாதிபதி', value: 'பாதகாதிபதி' },
      { name: 'மற்றவை', value: 'மற்றவை'},
    ];

    return allValues;
  }

  get_All_Signs() {
    var allSigns = [
      { name: 'மேஷம்', value: 'மேஷம்'},
      { name: 'ரிஷபம்', value: 'ரிஷபம்'},
      { name: 'மிதுனம்', value: 'மிதுனம்'},
      { name: 'கடகம்', value: 'கடகம்'},
      { name: 'சிம்மம்', value: 'சிம்மம்'},
      { name: 'கன்னி', value: 'கன்னி'},
      { name: 'துலாம்', value: 'துலாம்'},
      { name: 'விருச்சிகம்', value: 'விருச்சிகம்'},
      { name: 'தனுசு', value: 'தனுசு'},
      { name: 'மகரம்', value: 'மகரம்'},
      { name: 'கும்பம்', value: 'கும்பம்'},
      { name: 'மீனம்', value: 'மீனம்'},
    ];
    return allSigns;
  }

  get_All_Planets() {
    var allPlanets = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allPlanets;
  }

  get_All_Houses() {
    var allHouses = [
      { name: 'ASWINI', value: 'aswini' },
      { name: 'MAGAM', value: 'magam' },
      { name: 'MOOLAM', value: 'moolam' },
    ];
    return allHouses;
  }
}