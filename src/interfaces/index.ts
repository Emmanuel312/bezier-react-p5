export interface Point {
  x: number;
  y: number;
}
export interface ISketchProps {
  bezierPointsList: Point[][];
  selected: number;
  add: boolean;
}
