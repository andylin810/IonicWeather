import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  city: Weather;
  cityList = [];

  constructor(private weatherService: WeatherService, private storage:Storage, private dataService: DataService) {

    this.showWeatherOnLoad();
    this.dataService.message.subscribe(
      message => { 
        if(message!="default") {
          this.storage.get("favourite").then(
            val => {
              val.push(message);
              this.storage.set("favourite",val);
            }
          );
          this.cityList.push(message);
      }
    }
    )
  }


  provideWeather(city){
    this.weatherService.getWeather(city).subscribe(
      data => { 
        this.city = data;
      }
    );
  }

  showWeatherOnLoad(){
    this.storage.get("default").then(
      val => {
        if(val){
          this.provideWeather(val);
        } else {
          this.provideWeather('Toronto');
        }
      }
    );
    this.storage.get("favourite").then(
      val => {
        if(val) {
          for(let i of val){
            this.cityList.push(i);
          }
        } else {
          this.cityList.push('Toronto');
          return this.storage.set("favourite",["Toronto"]);
        }
      }
    )

  }

  setDefault(city) {
    this.storage.set("default",city);
    this.provideWeather(city);
  }

  deleteCity(city){
    this.cityList = this.cityList.filter( c => {
      return city != c;
    } );

    this.storage.get("favourite").then(
      val => {
        let cities = val.filter( c => {
          return city != c;
        } );
        this.storage.set("favourite",cities);
      }
    );

    this.storage.get('default').then(
      val => {
        if ( val == city){
          this.storage.set("default","Toronto");
          this.provideWeather("Toronto");
        }
      }
    );
  }



}
