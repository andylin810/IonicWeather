import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  myForm: FormGroup;
  weather: any;

  public errorMessage = {
    name: [
      {
        type: 'required', message: 'City name is required!'
      }
    ]
  }

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router,
    private weatherService: WeatherService, private alertController: AlertController) {
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required
        ]
      ]
    })
  }

  ngOnInit() {
  }

  submit() {
    this.validateCity(this.myForm.controls['name'].value);

  }


  validateCity(city) {
    this.weatherService.getWeatherTest(city).subscribe(
      data => {
        this.dataService.changeMessage(this.myForm.controls['name'].value);
        this.router.navigate(['/home'])

      },
      error => {
        this.alert();
      }
    );
  }


  async alert() {
    const alert = await this.alertController.create({
      subHeader: 'Error: ' + this.myForm.controls['name'].value + ' is not a valid city name!',
      message: 'Please enter a valid city name, ex. London.',
      buttons: ['OK']
    });

    await alert.present();
  }


}
