import { Component, OnInit, Input } from '@angular/core';
import { Polygon } from 'src/app/vertex.interface';
import { Store } from '@ngrx/store';
import * as store from '../../store';
import { Delete } from 'src/app/store/actions';

@Component({
  selector: 'polygon-item',
  templateUrl: './polygon-item.component.html',
  styleUrls: ['./polygon-item.component.scss']
})
export class PolygonItemComponent implements OnInit {

  constructor(private store: Store<store.PolyState>) { }

  @Input() polygonData: Polygon;

  ngOnInit() { }

  private deleteItem(event: Event): void {
    this.store.dispatch(new Delete({ id: this.polygonData.id }));
  }

}
