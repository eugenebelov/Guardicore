import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vertex } from '../vertex.interface';
import * as store from '../store';
import { Add } from '../store/actions';

@Component({
  selector: 'polygon-maker',
  templateUrl: './polygon-maker.component.html',
  styleUrls: ['./polygon-maker.component.scss']
})
export class PolygonMakerComponent implements OnInit {

  constructor(private store: Store<store.PolyState>) { }

  @ViewChild('vertexes') vertexesInput: ElementRef;

  ngOnInit() {
  }

  private addPoly(): void {
    const vtx = this.vertexesInput.nativeElement.value.split(';');

    const vertexes: Array<Vertex> = vtx.map( item => {
      const v = item.split(',');
      return { x: v[0], y: v[1] }
    });

    this.vertexesInput.nativeElement.value = '';
    this.store.dispatch(new Add({ polygon: { vertexes: vertexes } }));
  }

}
