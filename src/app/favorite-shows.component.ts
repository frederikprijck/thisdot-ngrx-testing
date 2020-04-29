import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { selectFavoriteShows } from './state/selectors';
import { favoriteShowsActions } from './state/actions';
import { AppState } from './state/state';

@Component({
  selector: 'app-favorite-shows',
  templateUrl: './favorite-shows.component.html'
})
export class FavoriteShowsComponent {
  shows$ = this.store.pipe(select(selectFavoriteShows));

  constructor(private store: Store<AppState>) {}

  favoriteShow(showId) {
    this.store.dispatch(favoriteShowsActions.favoriteShowClicked({ showId }));
  }

  unfavoriteShow(showId) {
    this.store.dispatch(favoriteShowsActions.unfavoriteShowClicked({ showId }));
  }

  removeShow(showId) {
    this.store.dispatch(favoriteShowsActions.removeShowClicked({ showId }));
  }
}
