import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EntryState, EntryStateActions } from '../sheard/_state/entries.state';
import { ComponentBase } from '../sheard/base/base-component';
import { map, Observable, takeUntil } from 'rxjs';
import { ApiUrls } from '../sheard/healper/constant';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent extends ComponentBase implements OnInit {
  entries$!: Observable<any[]>;
  constructor(private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.store.dispatch(
      new EntryStateActions.FetchAll({
        apiUrl: ApiUrls.CityApi,
        loader: false,
        entity: 'CityDto',
      })
    );
    this.entries$ = this.store.select(EntryState.fetchAll('CityDto')).pipe(
      map((result: any[]) => result as any[]),
      takeUntil(this.destroy$)
    );
  }
}
