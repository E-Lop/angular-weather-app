import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  currentCity = new BehaviorSubject<string | null>(null);

  constructor(public http: HttpClient) { }

  getCoordinates(city: string) {
    return this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=it&format=json`)
  }
}
