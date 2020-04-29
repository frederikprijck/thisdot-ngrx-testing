import * as fromReducer from './reducer';
import {
  getAllSuccess,
  favoriteShowSuccess,
  unfavoriteShowSuccess,
  removeShowSuccess
} from './actions';
import { Show } from '../shows/shows.service';

describe('ShowsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown'
      };
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('getAllSuccess action', () => {
    it('should update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: false
        }
      ];
      const action = getAllSuccess({ shows: newState });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('favoriteShowSuccess action', () => {
    it('should update the state in an immutable way', () => {
      const initialState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: false
        }
      ];
      const action = favoriteShowSuccess({ showId: 1 });
      const state = fromReducer.reducer(initialState, action);

      expect(state[0].isFavorite).toEqual(true);
    });

    it('should not update the state when showId does not exist', () => {
      const initialState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: false
        }
      ];
      const action = favoriteShowSuccess({ showId: 2 });
      const state = fromReducer.reducer(initialState, action);

      expect(state[0].isFavorite).toEqual(false);
    });
  });

  describe('unfavoriteShowSuccess action', () => {
    it('should update the state in an immutable way', () => {
      const initialState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: true
        }
      ];
      const action = unfavoriteShowSuccess({ showId: 1 });
      const state = fromReducer.reducer(initialState, action);

      expect(state[0].isFavorite).toEqual(false);
    });

    it('should not update the state when showId does not exist', () => {
      const initialState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: true
        }
      ];
      const action = unfavoriteShowSuccess({ showId: 2 });
      const state = fromReducer.reducer(initialState, action);

      expect(state[0].isFavorite).toEqual(true);
    });
  });

  describe('removeShowSuccess action', () => {
    it('should update the state in an immutable way', () => {
      const initialState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: true
        }
      ];
      const action = removeShowSuccess({ showId: 1 });
      const state = fromReducer.reducer(initialState, action);

      expect(state.length).toEqual(0);
    });

    it('should not update the state when showId does not exist', () => {
      const initialState: Array<Show> = [
        {
          id: 1,
          name: 'Test',
          description: 'Description',
          imgUrl: '',
          isFavorite: true
        }
      ];
      const action = removeShowSuccess({ showId: 2 });
      const state = fromReducer.reducer(initialState, action);

      expect(state.length).toEqual(1);
    });
  });
});
