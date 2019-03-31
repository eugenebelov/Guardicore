import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonsListComponent } from './polygons-list.component';

describe('PolygonsListComponent', () => {
  let component: PolygonsListComponent;
  let fixture: ComponentFixture<PolygonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
