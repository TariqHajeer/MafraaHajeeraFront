import { Injectable } from '@angular/core';
import {
  Action,
  SelectorOptions,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { finalize, map, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ServiceFactoryService } from '../_service/service-factory.service';

export interface GenericStateRequest<T> {
  entity: string;
  apiUrl: string;
  loader: boolean;
  body?: T;
  id?: string;
}

interface EntityWithId {
  id: string;
}

export namespace EntryStateActions {
  export class Add<T> {
    static readonly type = '[Entry State] Add';
    constructor(public payload: GenericStateRequest<T>) {}
  }

  export class FetchAll<T> {
    static readonly type = '[Entry State] Fetch All';
    constructor(public payload: GenericStateRequest<T>) {}
  }
  export class FetchFiltered<T> {
    static readonly type = '[Entry State] Fetch Filtered';
    constructor(public payload: GenericStateRequest<T>) {}
  }

  export class Fetch<T> {
    static readonly type = '[Entry State] Fetch';
    constructor(public payload: GenericStateRequest<T> & { id: string }) {}
  }

  export class Update<T> {
    static readonly type = '[Entry State] Update';
    constructor(public payload: GenericStateRequest<T>) {}
  }
  export class Patch<T> {
    static readonly type = '[Entry State] Patch';
    constructor(public payload: GenericStateRequest<T>) {}
  }

  export class Delete<T> {
    static readonly type = '[Entry State] Delete';
    constructor(public payload: GenericStateRequest<T>) {}
  }
}

export interface EntryStateModel<T> {
  entries: {
    [key: string]: T[];
  };
  filteredEntries: {
    [key: string]: T[];
  };
  presentedEntry: {
    [key: string]: T;
  };
}

@State<EntryStateModel<any>>({
  name: 'entriesState',
  defaults: {
    entries: {},
    filteredEntries: {},
    presentedEntry: {},
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class EntryState<T extends EntityWithId> {
  constructor(private service: ServiceFactoryService) {}

  // --------------------------------- SELECTORS ------------------------------
  static fetch<T>(entity: string) {
    return createSelector(
      [EntryState],
      (state: EntryStateModel<T>) => state.presentedEntry?.[entity]
    );
  }

  static fetchAll<T>(entity: string) {
    return createSelector(
      [EntryState],
      (state: EntryStateModel<T>) => state.entries?.[entity]
    );
  }

  static fetchFiltered<T>(entity: string) {
    return createSelector(
      [EntryState],
      (state: EntryStateModel<T>) => state.filteredEntries?.[entity]
    );
  }

  // --------------------------------- ACTIONS --------------------------------
  @Action(EntryStateActions.FetchAll)
  fetchAll(
    { setState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.FetchAll<T>
  ) {
    return this.service.appGet<any>(payload.apiUrl, null, payload.loader).pipe(
      map((response) => response?.Payload ?? response),
      tap((result: T[]) => {
        setState(
          patch<EntryStateModel<T>>({
            entries: patch({
              [payload.entity]: [...result],
            }),
          })
        );
      }),
      finalize(() => {})
    );
  }

  @Action(EntryStateActions.FetchFiltered)
  fetchFiltered(
    { setState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.FetchFiltered<T>
  ) {
    return this.service
      .appGet<any>(payload.apiUrl, payload.body, payload.loader)
      .pipe(
        map((response) => response?.Payload ?? response),
        tap((result: T[]) => {
          setState(
            patch<EntryStateModel<T>>({
              filteredEntries: patch({
                [payload.entity]: [...result],
              }),
            })
          );
        }),
        finalize(() => {})
      );
  }

  @Action(EntryStateActions.Fetch)
  fetch(
    { setState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.Fetch<T>
  ) {
    let params = !!payload?.id ? new HttpParams().set('Id', payload.id) : null;

    return this.service
      .appGet<any>(payload.apiUrl, params, payload.loader)
      .pipe(
        map((response) => response?.Payload ?? response),
        tap((result: T) => {
          setState(
            patch<EntryStateModel<T>>({
              presentedEntry: patch({
                [payload.entity]: result,
              }),
            })
          );
        }),
        finalize(() => {})
      );
  }

  @Action(EntryStateActions.Add, { cancelUncompleted: true })
  add(
    { setState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.Add<T>
  ) {
    return this.service
      .appPost<T>(payload.apiUrl, payload.body, payload.loader)
      .pipe(map((response) => response));
  }

  @Action(EntryStateActions.Update, { cancelUncompleted: true })
  edit(
    { setState, getState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.Update<T>
  ) {
    return this.service
      .appPut<T>(payload.apiUrl, payload.body, payload.loader)
      .pipe(map(() => payload));
  }
  @Action(EntryStateActions.Patch, { cancelUncompleted: true })
  patch(
    { setState, getState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.Patch<T>
  ) {
    return this.service
      .appPatch<T>(payload.apiUrl, payload.body)
      .pipe(map(() => payload));
  }

  @Action(EntryStateActions.Delete, { cancelUncompleted: true })
  delete(
    { setState, getState }: StateContext<EntryStateModel<T>>,
    { payload }: EntryStateActions.Delete<T>
  ) {
    return this.service
      .appDelete<T>(payload.apiUrl, payload.body, payload.loader)
      .pipe(map(() => payload));
  }
}
