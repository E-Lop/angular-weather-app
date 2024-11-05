import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-chartbox',
  templateUrl: './chartbox.component.html',
  styleUrls: ['./chartbox.component.css']
})
export class ChartboxComponent implements OnInit, AfterViewInit {
  @ViewChild('weatherChart') weatherChartRef!: ElementRef<HTMLCanvasElement>;
  weatherData: any;
  chart!: Chart;

  constructor(public weatherService: WeatherService) {
    // Initialize weatherData with a sample structure
    this.weatherData = {
      hourly: {
        time: [], // Initialize as empty array
        temperature2m: [] // Initialize as empty array
      }
    };

    // Register chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.weatherService.currentWeather.subscribe(weather => {
      if (weather) {
        this.fetchWeatherData(weather.latitude, weather.longitude);
      }
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  async fetchWeatherData(latitude: number, longitude: number): Promise<void> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&forecast_hours=24`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.processWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  processWeatherData(data: any): void {
    const utcOffsetSeconds = data.utc_offset_seconds;
    const hourly = data.hourly;

    // Process weather data
    this.weatherData = {
      hourly: {
        time: hourly.time.map((t: string) => new Date(t)),
        temperature2m: hourly.temperature_2m
      }
    };

    // Log processed data for debugging
    console.log('Processed weather data:', this.weatherData);

    // Update chart data
    this.updateChart();
  }

  createChart(): void {
    const ctx = this.weatherChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.weatherData.hourly.time.map((time: Date) => time.toISOString()),
          datasets: [
            {
              label: 'Temperature (°C)',
              data: this.weatherData.hourly.temperature2m,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)',
            }
          ]
        },
        options: {
          responsive: true,
        }
      });
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.labels = this.weatherData.hourly.time.map((time: Date) => time.toISOString());
      this.chart.data.datasets[0].data = this.weatherData.hourly.temperature2m;
      this.chart.update();
    }
  }
}