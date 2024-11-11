import { Directive, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ComponentBase implements OnDestroy {
  destroy$ = new ReplaySubject<void>(1);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days - 1);
    return result;
  }
}
