export interface Vertex{
    x: number;
    y: number;
}

export interface Polygon{
    id?: number;
    vertexes: Array<Vertex>;
}