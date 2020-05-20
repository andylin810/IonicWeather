import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  api = 'f2763c56a7466a13be809cb8fdcce76f';
  url = 'http://api.openweathermap.org/data/2.5/weather?q=';

  constructor(public http: HttpClient) {


  }

  getWeather(city): Observable<any> {
    return this.http.get(this.url + city + '&APPID=' + this.api).pipe(
      map((cityWeather: any) => new Weather(cityWeather.name,cityWeather.sys.country,cityWeather.weather[0].description,
      (cityWeather.main.temp-273.15).toFixed(1),cityWeather.main.humidity,cityWeather.wind.speed,cityWeather.weather[0].icon))
    );

  }


  getWeatherTest(city): Observable<any>{
    return this.http.get(this.url + city + '&APPID=' + this.api);
  }
}

