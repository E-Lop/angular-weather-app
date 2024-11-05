import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherboxComponent } from './features/weatherbox/weatherbox.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartboxComponent } from './core/features/chartbox/chartbox.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherboxComponent,
    ChartboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
