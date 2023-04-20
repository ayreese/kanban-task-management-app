export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  color?: string;
  tasks?: Task[];
  columns: any[];
}

export interface Modal extends Task {
  type: string;
}

export interface Task {
  name: string;
  body?: string;
  subtasks?: Subtask[];
  changeToggle?: (state: boolean) => void;
  columns: any[];
}

export interface Subtask {
  name: string;
  status: string;
}

export interface SelectBoard {
  board: Board;
  toggle: boolean;
  total: number;
}

export interface BoardSelection {
  boards: Board[];
  toggle: boolean;
  setBoardSelectionToggle: (state: boolean) => void;
}

export interface Toggle {
  changeToggle: (state: boolean) => void;
  current?: boolean;
}

export interface Auth {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export type CreateBoard = {
  name: string;
  columns: {
    name: string;
    color: string;
  }[];
};

export interface CreateColumn {
  name: string;
  color: string;
}

export interface CreateTask {
  name: string;
  body: string;
  columnId: string;
}

export interface CreateColumnProps {
  currentBoard: Board;
  modalToggle: boolean;
  setModalToggle: (state: any) => void;
}
