import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState } from './state/state';
import { FavoriteShowsComponent } from './favorite-shows.component';
import { favoriteShowsActions } from './state/actions';
import { ShowsComponent } from './shows/shows.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { selectFavoriteShows } from './state/selectors';

describe('FavoriteShowsComponent', () => {
  let fixture: ComponentFixture<FavoriteShowsComponent>;
  let component: FavoriteShowsComponent;
  let store: MockStore<AppState>;
  const initialState = {
    shows: [
      {
        id: 1,
        name: 'A',
        description: 'Show A',
        imgUrl: '',
        isFavorite: false
      },
      {
        id: 2,
        name: 'B',
        description: 'Show B',
        imgUrl: '',
        isFavorite: false
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [FavoriteShowsComponent, ShowsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FavoriteShowsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('favoriteShow should dispatch favoriteShowClicked', () => {
    component.favoriteShow('a');
    expect(store.dispatch).toHaveBeenCalledWith(
      favoriteShowsActions.favoriteShowClicked({ showId: 'a' })
    );
  });

  it('unfavoriteShow should dispatch unfavoriteShowClicked', () => {
    component.unfavoriteShow('a');
    expect(store.dispatch).toHaveBeenCalledWith(
      favoriteShowsActions.unfavoriteShowClicked({ showId: 'a' })
    );
  });

  it('removeShow should dispatch removeShowClicked', () => {
    component.removeShow('a');
    expect(store.dispatch).toHaveBeenCalledWith(
      favoriteShowsActions.removeShowClicked({ showId: 'a' })
    );
  });

  describe('selectors', () => {
    let mockShowsSelector;
    beforeEach(() => {
      mockShowsSelector = store.overrideSelector(selectFavoriteShows, [{
        id: 3,
        name: 'C',
        description: 'Show C',
        imgUrl: '',
        isFavorite: true
      }]);
      fixture.detectChanges();
    });

    it('should render all favorite shows', () => {
      expect(fixture.debugElement.queryAll(By.css('.mat-card')).length).toBe(1);
    });

    it('should update the UI when the selector changes', () => {
      mockShowsSelector.setResult([
        {
          id: 1,
          name: 'A',
          description: 'Show A',
          imgUrl: '',
          isFavorite: true
        },
        {
          id: 2,
          name: 'B',
          description: 'Show B',
          imgUrl: '',
          isFavorite: true
        }
      ]);
      store.refreshState();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('.mat-card')).length).toBe(2);
    });
  })
});
