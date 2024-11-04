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

  getCoordinates(city: string) {
    return this.http.get<Coord>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it&format=json`)
  }
  getWeather(lat: any, long: any) {  
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=&daily=&timezone=Europe%2FBerlin`)
  }
}
