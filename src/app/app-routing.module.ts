import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllShowsComponent } from './all-shows.component';
import { FavoriteShowsComponent } from './favorite-shows.component';

const routes: Routes = [
  {
    path: '',
    component: AllShowsComponent
  },
  {
    path: 'favorites',
    component: FavoriteShowsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
