import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as PolygonActions from './actions';
import * as r from './reducers/polygons.reducer';

export interface PolyState {
  polygons: r.PolygonState
}


export const reducers: ActionReducerMap<PolyState, PolygonActions.ActionUnion> = {
  polygons: r.PolygonReducer
};

export const metaReducers: MetaReducer<PolyState>[] = !environment.production ? [] : [];
