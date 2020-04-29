import { createReducer, on, Action } from '@ngrx/store';
import { Show } from '../shows/shows.service';
import {
  getAllSuccess,
  favoriteShowSuccess,
  unfavoriteShowSuccess,
  removeShowSuccess
} from './actions';

export const initialState = [];

const showsReducer = createReducer<Array<Show>>(
  initialState,
  on(getAllSuccess, (state, { shows }) => [...shows]),
  on(favoriteShowSuccess, (state, { showId }) =>
    state.map(show =>
      show.id === showId ? { ...show, isFavorite: true } : show
    )
  ),
  on(unfavoriteShowSuccess, (state, { showId }) =>
    state.map(show =>
      show.id === showId ? { ...show, isFavorite: false } : show
    )
  ),
  on(removeShowSuccess, (state, { showId }) =>
    state.filter(show => show.id !== showId)
  )
);

export function reducer(state: Array<Show>, action: Action) {
  return showsReducer(state, action);
}
