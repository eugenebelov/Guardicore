import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Polygon, Vertex } from '../vertex.interface';
import * as store from '../store';
import { Add } from '../store/actions';
import { fromEvent, Observable } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { PolygonState } from '../store/reducers/polygons.reducer';

@Component({
  selector: 'polygon-maker',
  templateUrl: './polygon-maker.component.html',
  styleUrls: ['./polygon-maker.component.scss']
})
export class PolygonMakerComponent implements AfterViewInit {

  private data$: Observable<any>;
  constructor(private store: Store<store.PolyState>) {
    this.data$ = this.store.pipe(select('polygons'));
  }

  @ViewChild('vertexes') vertexesInput: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  private polygon: Array<any> = [];
  private polygonReady: boolean = false;

  ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = 400;
    canvasEl.height = 300;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.cx.fillStyle = '#00aacc';

    fromEvent(this.canvas.nativeElement, 'click').pipe(
      pairwise()
    ).subscribe( ([start, end]: [MouseEvent, MouseEvent]) => this.drawPolygon(start, end));

    this.data$.subscribe((state: PolygonState) => {
      if (state) {
        this.cx.clearRect(0, 0, 400, 300);
        state.polygons.forEach((polygon) => {
         this.cx.beginPath();
          this.cx.moveTo(polygon.vertexes[0].x, polygon.vertexes[0].y); // from

          polygon.vertexes.forEach(v => {
            this.cx.lineTo(v.x, v.y);
            this.cx.stroke();
          })
        })
      }
    })
  }

  private drawPolygon(start: MouseEvent, end: MouseEvent): void {
    if (!this.polygonReady) {
      this.polygon.push({x: start.layerX, y:start.layerY}, {x:end.layerX, y:end.layerY});

      if (this.polygon.length) {
        const firstPoint = this.polygon[0];
        const lastPoint = this.polygon[this.polygon.length - 1];

        if (this.isPointClose(firstPoint, lastPoint)) {
          this.drawOnCanvas({x: start.layerX, y:start.layerY}, {x:firstPoint.x, y:firstPoint.y});
          this.fillPoly();
          this.dispatchPolygonToStore();
          this.polygonReady = true;
          this.polygon.length = 0;
        } else {
          this.drawOnCanvas({x: start.layerX, y:start.layerY}, {x:end.layerX, y:end.layerY});
        }
      }
    } else {
      this.polygonReady = false;
    }
  }

  private fillPoly(): void {
    const shape = this.polygon.slice(0);
    let curCoord = shape.shift();
    this.cx.beginPath();
    this.cx.moveTo(curCoord.x, curCoord.y);
    while(shape.length) {
      curCoord = shape.shift();
      this.cx.lineTo(curCoord.x, curCoord.y);
    }
    this.cx.closePath();
    this.cx.fill();
  }

  private isPointClose(pointSource, pointTarget, offset = 20): boolean {
    // (X - Xo)^2 + (Y - Yo)^2 < R^2

    const R = Math.pow(offset, 2);
    const X = Math.pow((pointTarget.x - pointSource.x), 2);
    const Y = Math.pow((pointTarget.y - pointSource.y), 2);

    return (X + Y < R);
  }

  private drawOnCanvas( prevPos: { x: number; y: number }, currentPos: { x: number; y: number } ): void {
    // incase the context is not set
    if (!this.cx) {
      return;
    }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }

  private dispatchPolygonToStore(): void {
    const vertexes: Array<Vertex> = [...this.polygon];
    this.store.dispatch(new Add({ polygon: { vertexes: vertexes } }));
  }

}
