import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Coord } from '../model/coord';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentCity = new BehaviorSubject<Coord | null>(null);

  currentWeather = new BehaviorSubject<any | null>(null);

  preferredCities = new BehaviorSubject<string[]>(JSON.parse(localStorage.getItem('preferredCities') || '[]'));

  constructor(public http: HttpClient) { 
    this.currentCity.subscribe(value => {
      if (value) {
        this.getWeather(value.latitude, value.longitude).subscribe((data: any) => {
          console.log('meteo:', data);
          this.currentWeather.next(data);
        });
      }
    });
  }

  // Method to add a city to preferredCities
  addToPreferred(city: any): void {
    console.log('passing city:', city);
    
    const currentPreferred = this.preferredCities.value;
    if (!currentPreferred.some((c: any) => c.city.id === city.city.id)) {
      const updatedPreferred = [...currentPreferred, city];
      this.preferredCities.next(updatedPreferred);
      localStorage.setItem('preferredCities', JSON.stringify(updatedPreferred));
    }
  }

  // Method to remove a city from preferredCities
  removeFromPreferred(city: any): void {
    const currentPreferred = this.preferredCities.value;
    const updatedPreferred = currentPreferred.filter((c: any) => c.city.id !== city.city.id);
    this.preferredCities.next(updatedPreferred);
    localStorage.setItem('preferredCities', JSON.stringify(updatedPreferred));
  }

  getCoordinates(city: string) {
    return this.http.get<Coord>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it&format=json`)
  }
  getWeather(lat: any, long: any) {  
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=&daily=&timezone=Europe%2FBerlin`)
  }
}
