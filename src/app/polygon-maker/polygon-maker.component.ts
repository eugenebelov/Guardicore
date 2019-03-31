import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Vertex } from '../vertex.interface';
import * as store from '../store';
import { Add } from '../store/actions';
import { fromEvent } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'polygon-maker',
  templateUrl: './polygon-maker.component.html',
  styleUrls: ['./polygon-maker.component.scss']
})
export class PolygonMakerComponent implements OnInit {

  constructor(private store: Store<store.PolyState>) { }

  @ViewChild('vertexes') vertexesInput: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  private cx: CanvasRenderingContext2D;

  ngOnInit() {
  }

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

    const eve$ = fromEvent(this.canvas.nativeElement, 'click');

    eve$.pipe(
      pairwise()
    ).subscribe( ([start, end]: [MouseEvent, MouseEvent]) => {
      // store start/end coords from line
      // every time check if last entered coord is nearby of first
      // if so - connect 1st and last
      // reset storage and start again

      // this.drawOnCanvas({x: start.layerX, y:start.layerY}, {x:end.layerX, y:end.layerY});
    })
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
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
