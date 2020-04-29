import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ShowsEffects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  appLoaded,
  getAllSuccess,
  favoriteShowSuccess,
  unfavoriteShowSuccess,
  removeShowSuccess,
  allShowsActions,
} from './actions';

import { TestScheduler } from 'rxjs/testing';
import { ShowsService } from '../shows/shows.service';

describe('ShowsEffects', () => {
  const initialState = { shows: [] };
  const showsService = jasmine.createSpyObj('showsService', [
    'getAll',
    'favoriteShow',
    'unfavoriteShow',
    'removeShow'
  ]);
  let effects: ShowsEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: ShowsService, useValue: showsService }
      ]
    });

    effects = TestBed.inject(ShowsEffects);
    store = TestBed.inject(MockStore);
    store.setState({});

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAllShows$', () => {
    it('should handle appLoaded and return a getAllSuccess action', () => {
      const shows = [];
      const action = appLoaded();
      const outcome = getAllSuccess({ shows });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: shows });
        showsService.getAll.and.returnValue(response);

        expectObservable(effects.getAllShows$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('favoriteShow$', () => {
    it('should handle allShowsActions.favoriteShowClicked and return a favoriteShowSuccess action', () => {
      const showId = 1;
      const action = allShowsActions.favoriteShowClicked({ showId });
      const outcome = favoriteShowSuccess({ showId });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: 'a' });
        showsService.favoriteShow.and.returnValue(response);

        expectObservable(effects.favoriteShow$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('unfavoriteShow$', () => {
    it('should handle allShowsActions.unfavoriteShowClicked and return a unfavoriteShowSuccess action', () => {
      const showId = 1;
      const action = allShowsActions.unfavoriteShowClicked({ showId });
      const outcome = unfavoriteShowSuccess({ showId });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: 'a' });
        showsService.unfavoriteShow.and.returnValue(response);

        expectObservable(effects.unfavoriteShow$).toBe('--b', {
          b: outcome
        });
      });
    });
  });

  describe('removeShow$', () => {
    it('should handle allShowsActions.removeShowClicked and return a removeShowSuccess action', () => {
      const showId = 1;
      const action = allShowsActions.removeShowClicked({ showId });
      const outcome = removeShowSuccess({ showId });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: 'a' });
        showsService.removeShow.and.returnValue(response);

        expectObservable(effects.removeShow$).toBe('--b', {
          b: outcome
        });
      });
    });
  });
});
