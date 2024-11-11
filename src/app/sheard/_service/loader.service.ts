import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loader = new Subject<any>();
  constructor() {}
  showLoader() {
    this.loader.next({ load: true });
  }
  hideLoader() {
    this.loader.next({ load: false });
  }
  getLoaderState(): Observable<any> {
    return this.loader.asObservable();
  }
}
