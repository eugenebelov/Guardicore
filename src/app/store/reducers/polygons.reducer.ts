import { Vertex, Polygon } from "../../vertex.interface";
import * as PolygonActions from '../actions';

export interface PolygonState {
    id?: number;
    polygons: Array<Polygon>
}  

export const initialState: PolygonState = {
    id: 0,
    polygons: []
};

export function PolygonReducer(
    state = initialState,
    action: PolygonActions.ActionUnion
): PolygonState {
    switch(action.type) {
        case PolygonActions.ActionTypes.Add: 
        {
            return {
                ...state,
                polygons: [...state.polygons, {
                    id: state.id++,
                    vertexes: [...action.payload.polygon.vertexes]
                }]
            };
        }

        case PolygonActions.ActionTypes.Delete: 
        {
            const res: Polygon[] = state.polygons.reduce((acc: Polygon[], cur) => {
                if( cur.id === action.payload.id) return acc;
                return acc.concat(cur);
            }, []);

            return {
                ...state,
                polygons: [...res]
            };
        }

        case PolygonActions.ActionTypes.Edit: {
            const originPolygons = [...state.polygons];
            const editedPolygons: Polygon[] = originPolygons.map( p => {
                const polygon = {...p};
                if (polygon.id === action.payload.polygon.id) {
                    polygon.vertexes = [...action.payload.polygon.vertexes];
                }
                return polygon;
            });
            
            return {
                ...state,
                polygons: [...editedPolygons]
            }
        }

        case PolygonActions.ActionTypes.Reset: {
            return {
                ...initialState
            }
        }
        
    }
}