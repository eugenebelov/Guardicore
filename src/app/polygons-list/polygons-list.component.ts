import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as store from '../store';
import { Observable } from 'rxjs';
import { Reset } from '../store/actions';

@Component({
  selector: 'polygons-list',
  templateUrl: './polygons-list.component.html',
  styleUrls: ['./polygons-list.component.scss']
})
export class PolygonsListComponent implements OnInit {

  private data$: Observable<any>
  constructor(private store: Store<store.PolyState>) {
    this.data$ = this.store.pipe(select('polygons'));
  }

  ngOnInit() {
  }

  private resetPolyList(event: Event): void {
    this.store.dispatch(new Reset());
  }

}
