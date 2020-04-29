import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import * as showsActions from './state/actions';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "thisdot-ngrx";


  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(showsActions.appLoaded());
  }
}
