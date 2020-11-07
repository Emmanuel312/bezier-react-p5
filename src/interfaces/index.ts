export interface ISketchProps {
  selected: number;
  add: boolean;
  evaluationAmount: string;
  checkboxStates: ICheckboxStates;
}

export interface IBezierList {
  curve: any[];
  evaluationAmount: number;
}

export interface ICheckboxStates {
  curve: boolean;
  points: boolean;
  line: boolean;
}
