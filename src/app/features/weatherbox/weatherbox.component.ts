import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weatherbox',
  templateUrl: './weatherbox.component.html',
  styleUrls: ['./weatherbox.component.css']
})
export class WeatherboxComponent implements OnInit {
  sortMode: 'name' | 'temperature' = 'name';
  sortedPreferredCities: any[] = [];

  weatherCodeDescriptions: { [key: string]: string } = {
    '0': 'Cielo sereno',
    '1': 'Perlopiù sereno, in parte coperto e nuvoloso',
    '2': 'Perlopiù sereno, in parte coperto e nuvoloso',
    '3': 'Perlopiù sereno, in parte coperto e nuvoloso',
    '45': 'Nebbia e deposito di brina',
    '48': 'Nebbia e deposito di brina',
    '51': 'Pioggerella: leggera, moderata e intensa',
    '53': 'Pioggerella: leggera, moderata e intensa',
    '55': 'Pioggerella: leggera, moderata e intensa',
    '56': 'Pioggerellina gelata: leggera e intensa',
    '57': 'Pioggerellina gelata: leggera e intensa',
    '61': 'Pioggia: leggera moderata e intensa',
    '63': 'Pioggia: leggera moderata e intensa',
    '65': 'Pioggia: leggera moderata e intensa',
    '66': 'Pioggia congelata: leggera e intensa',
    '67': 'Pioggia congelata: leggera e intensa',
    '71': 'Caduta di neve: leggera, moderata e intensa',
    '73': 'Caduta di neve: leggera, moderata e intensa',
    '75': 'Caduta di neve: leggera, moderata e intensa',
    '77': 'Chicchi di neve',
    '80': 'Rovesci di pioggia: leggera, moderata e violenta',
    '81': 'Rovesci di pioggia: leggera, moderata e violenta',
    '82': 'Rovesci di pioggia: leggera, moderata e violenta',
    '85': 'Nevicate leggere e intense',
    '86': 'Nevicate leggere e intense',
    '95': 'Temporale: leggero o moderato',
    '96': 'Temporale con grandine leggera e pesante',
    '99': 'Temporale con grandine leggera e pesante'
  };
  
  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.preferredCities.next(JSON.parse(localStorage.getItem('preferredCities') || '[]'));
    this.weatherService.preferredCities.subscribe(cities => {
      this.sortPreferredCities(cities);
    });
  }

  getWeatherDescription(code: number): string {
    return this.weatherCodeDescriptions[code] || 'Unknown weather code';
  }

  addToPreferred(data: { city: any, weather: any }) {
    this.weatherService.addToPreferred(data);
  }

  removeFromPreferred(city: string) {
    this.weatherService.removeFromPreferred(city);
  }

  toggleSortMode(): void {
    this.sortMode = this.sortMode === 'name' ? 'temperature' : 'name';
    this.sortPreferredCities(this.weatherService.preferredCities.value);
  }

  sortPreferredCities(cities: any[]): void {
    if (this.sortMode === 'name') {
      this.sortedPreferredCities = cities.sort((a, b) => a.city.name.localeCompare(b.city.name));
    } else {
      this.sortedPreferredCities = cities.sort((a, b) => b.weather.temperature_2m - a.weather.temperature_2m);
    }
  }

}
