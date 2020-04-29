import { createAction, props } from '@ngrx/store';

export const appLoaded = createAction('[App] App Loaded');

export const getAllSuccess = createAction(
  '[Shows API] Get all shows success',
  props<{ shows }>()
);
export const getAllFailed = createAction('[Shows API] Get all shows failed');


export const allShowsActions = {
  favoriteShowClicked: createAction(
    '[All Shows] favorite show',
    props<{ showId }>()
  ),

  unfavoriteShowClicked: createAction(
    '[All Shows] unfavorite show',
    props<{ showId }>()
  ),

  removeShowClicked: createAction(
    '[All Shows] remove show',
    props<{ showId }>()
  )
};

export const favoriteShowsActions = {
  favoriteShowClicked: createAction(
    '[Favorite Shows] favorite show',
    props<{ showId }>()
  ),

  unfavoriteShowClicked: createAction(
    '[Favorite Shows] unfavorite show',
    props<{ showId }>()
  ),

  removeShowClicked: createAction(
    '[Favorite Shows] remove show',
    props<{ showId }>()
  )
};



export const favoriteShowSuccess = createAction(
  '[Shows API] favorite show success',
  props<{ showId }>()
);

export const unfavoriteShowSuccess = createAction(
  '[Shows API] unfavorite show success',
  props<{ showId }>()
);

export const removeShowSuccess = createAction(
  '[Shows API] remove show success',
  props<{ showId }>()
);
