import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherboxComponent } from 'src/app/features/weatherbox/weatherbox.component';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  citySearchForm: FormGroup;

  constructor(private fb: FormBuilder, private weatherservice: WeatherService) { }

  ngOnInit(): void {
    this.citySearchForm = this.fb.group({
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.citySearchForm.valid) {
      const city = this.citySearchForm.value.city;
      this.weatherservice.getCoordinates(city).subscribe((data: any) => {
        this.weatherservice.currentCity.next(data.results[0]);
      });
      
      this.citySearchForm.reset();
    } else {
      alert('Please enter a city');
    }
  }

}
