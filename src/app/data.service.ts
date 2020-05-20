import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private messageSource = new BehaviorSubject<string>("default");
  message = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string){
    this.messageSource.next(message);
  }
}
