import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Show } from './shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent {
  @Input()
  shows: Array<Show>;
  @Output()
  favorite = new EventEmitter();
  @Output()
  unfavorite = new EventEmitter();
  @Output()
  remove = new EventEmitter();
}
