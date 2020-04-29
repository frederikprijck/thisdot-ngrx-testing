import { createSelector } from '@ngrx/store';
import { AppState } from './state';

export const selectShows = (state: AppState) => state.shows;
export const selectFavoriteShows = createSelector(
  selectShows,
  shows => shows.filter(show => show.isFavorite)
);
