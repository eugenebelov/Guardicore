import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertexEditComponent } from './vertex-edit.component';

describe('VertexEditComponent', () => {
  let component: VertexEditComponent;
  let fixture: ComponentFixture<VertexEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertexEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertexEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
