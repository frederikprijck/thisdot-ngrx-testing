import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { AllShowsComponent } from './all-shows.component';
import { FavoriteShowsComponent } from './favorite-shows.component';
import { StoreModule } from '@ngrx/store';
import { reducer as showReducer } from './state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ShowsEffects } from './state/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    AllShowsComponent,
    FavoriteShowsComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forRoot({ shows: showReducer }),
    EffectsModule.forRoot([ShowsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
