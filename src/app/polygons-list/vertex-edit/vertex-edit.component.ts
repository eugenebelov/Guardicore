import { Component, OnInit, Input, Directive, ElementRef, HostListener } from '@angular/core';
import { Vertex } from 'src/app/vertex.interface';
import { Store, select } from '@ngrx/store';
import * as store from '../../store';
import { Edit } from 'src/app/store/actions';
import { PolygonState } from 'src/app/store/reducers/polygons.reducer';

@Component({
  selector: 'vertex-edit',
  templateUrl: './vertex-edit.component.html',
  styleUrls: ['./vertex-edit.component.scss']
})
export class VertexEditComponent implements OnInit {

  @Input('vertex') polyVetexes: Array<Vertex>;
  @Input('polygonId') polygonId: number;
  
  private vertexData: Array<Vertex> = [];

  constructor(private store: Store<store.PolyState>) { }

  ngOnInit() {
    this.store.pipe(select('polygons')).subscribe((data: PolygonState) => {
      const d = data.polygons.find(p => p.id === this.polygonId);
      this.vertexData = (d && d.vertexes) ? d.vertexes : [];
    })
  }

  private editX(event, index) {
    this.store.dispatch(new Edit({
      polygon: { 
        id: this.polygonId,
        vertexes: this.getEditedVertexes('x', event.target.innerText, index)
      }
    }));
  }

  private editY(event, index) {
    this.store.dispatch(new Edit({
      polygon: { 
        id: this.polygonId,
        vertexes: this.getEditedVertexes('y', event.target.innerText, index)
      }
    }));
  }

  private getEditedVertexes(property, currentValue, index): Vertex[] {
    const data = [...this.vertexData];
    const prevVertValue = {...data[index]};
    prevVertValue[property] = currentValue;
    data[index] = prevVertValue;

    return data;
  }
}


@Directive({
  selector: 'div[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.innerText;
    this._el.nativeElement.innerText = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.innerText) {
      event.stopPropagation();
    }
  }
}