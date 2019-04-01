import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonMakerComponent } from './polygon-maker.component';

describe('PolygonMakerComponent', () => {
  let component: PolygonMakerComponent;
  let fixture: ComponentFixture<PolygonMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
