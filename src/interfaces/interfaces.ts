export interface Boards {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  color?: string;
  tasks: Task[];
}

export interface Modal extends Task {
  type: string;
}

export interface Task {
  title: string;
  description: string;
  subtasks?: Subtask[];
  changeToggle?: (state: boolean) => void;
}

export interface Subtask {
  name: string;
  status: string;
}

export interface BoardSelection {
  toggle?: boolean;
  boards: Boards[];
  index: number;
  total?: number;
  getBoard: (id: number) => void;
  setBoard: (state: boolean) => void;
}

export interface SelectBoard {
  boards: Boards[];
  index: number;
  total?: number;
  toggle?: boolean;
}

export interface Toggle {
  changeToggle: (state: boolean) => void;
  current?: boolean;
}

export interface Inputs {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

// export enum Status {
//   completed,
//   incomplete,
// }
