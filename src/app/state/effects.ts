import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  appLoaded,
  getAllSuccess,
  favoriteShowSuccess,
  unfavoriteShowSuccess,
  removeShowSuccess,
  allShowsActions,
  favoriteShowsActions
} from './actions';
import { ShowsService } from '../shows/shows.service';
import { exhaustMap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShowsEffects {
  getAllShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appLoaded),
      exhaustMap(() =>
        this.showsService.getAll().pipe(map(shows => getAllSuccess({ shows })))
      )
    )
  );

  favoriteShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allShowsActions.favoriteShowClicked, favoriteShowsActions.favoriteShowClicked),
      mergeMap(({ showId }) =>
        this.showsService
          .favoriteShow(showId)
          .pipe(map(() => favoriteShowSuccess({ showId })), catchError(error => of(null)))
      )
    )
  );

  unfavoriteShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allShowsActions.unfavoriteShowClicked, favoriteShowsActions.unfavoriteShowClicked),
      mergeMap(({ showId }) =>
        this.showsService
          .unfavoriteShow(showId)
          .pipe(map(() => unfavoriteShowSuccess({ showId })), catchError(error => of(null)))
      )
    )
  );

  removeShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allShowsActions.removeShowClicked, favoriteShowsActions.removeShowClicked),
      mergeMap(({ showId }) =>
        this.showsService
          .removeShow(showId)
          .pipe(map(() => removeShowSuccess({ showId })), catchError(error => of(null)))
      )
    )
  );

  constructor(private actions$: Actions, private showsService: ShowsService) {}
}
