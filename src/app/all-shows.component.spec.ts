import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState } from './state/state';
import { AllShowsComponent } from './all-shows.component';
import { allShowsActions } from './state/actions';
import { ShowsComponent } from './shows/shows.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('AllShowsComponent', () => {
  let fixture: ComponentFixture<AllShowsComponent>;
  let component: AllShowsComponent;
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
      declarations: [AllShowsComponent, ShowsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AllShowsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('favoriteShow should dispatch favoriteShowClicked', () => {
    component.favoriteShow('a');
    expect(store.dispatch).toHaveBeenCalledWith(
      allShowsActions.favoriteShowClicked({ showId: 'a' })
    );
  });

  it('unfavoriteShow should dispatch unfavoriteShowClicked', () => {
    component.unfavoriteShow('a');
    expect(store.dispatch).toHaveBeenCalledWith(
      allShowsActions.unfavoriteShowClicked({ showId: 'a' })
    );
  });

  it('removeShow should dispatch removeShowClicked', () => {
    component.removeShow('a');
    expect(store.dispatch).toHaveBeenCalledWith(
      allShowsActions.removeShowClicked({ showId: 'a' })
    );
  });

  it('should render all shows', () => {
    expect(fixture.debugElement.queryAll(By.css('.mat-card')).length).toBe(2);
  });

  it('should update the UI when the store changes', () => {
    store.setState({
      shows: [
        {
          id: 1,
          name: 'A',
          description: 'Show A',
          imgUrl: '',
          isFavorite: false
        }
      ]
    });
    store.refreshState();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.mat-card')).length).toBe(1);
  });
});
