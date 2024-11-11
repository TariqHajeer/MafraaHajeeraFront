import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl: string = '';
  frontUrl: string = '';
  passwordMinLength: number = 12;
  passwordMaxLength: number = 25;
  licenseKey: string = '0000-0000-000-0000';
  froalaKey: string = '';
  reCaptcha = false;

  constructor() {
    Object.assign(this, environment);
  }

  /*
   *  Extract data from response
   */
}
