import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonItemComponent } from './polygon-item.component';

describe('PolygonItemComponent', () => {
  let component: PolygonItemComponent;
  let fixture: ComponentFixture<PolygonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolygonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
