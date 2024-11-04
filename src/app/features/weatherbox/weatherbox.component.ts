import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weatherbox',
  templateUrl: './weatherbox.component.html',
  styleUrls: ['./weatherbox.component.css']
})
export class WeatherboxComponent implements OnInit {

  currentCity: string | null = null;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getCurrentCity();
  }

  getCurrentCity() {
    this.currentCity = localStorage.getItem('city');
  }

}
