import { Action } from '@ngrx/store';
import { Vertex, Polygon } from '../../vertex.interface';

export enum ActionTypes {
  Add = '[PolygonMaker Component] Add',
  Reset = '[PolygonList Component] Reset',
  Delete = '[PoligonItem Component] Delete',
  Edit = '[VertexEdit Component] Edit',
}

export class Add implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: { polygon: Polygon }) {}
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}

export class Delete implements Action {
  readonly type = ActionTypes.Delete;

  constructor(public payload: { id: number }) {}
}

export class Edit implements Action {
  readonly type = ActionTypes.Edit;

  constructor(public payload: { polygon: Polygon }) {}
}

export type ActionUnion = Add | Reset | Delete | Edit;