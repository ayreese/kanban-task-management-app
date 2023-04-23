import { type } from "os";

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
  id: string;
  body: string;
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

export type EditBoard = {
  name: string;
};

export interface CreateColumn {
  name: string;
  color: string;
}

export interface CreateTask {
  name: string;
  body: string;
  subtasks: {
    body: string;
  }[];
  columnId: string;
}

export interface CreateSubtask {
  body: string;
  status: string;
  taskId: string;
}

export interface CreationProps {
  currentBoard: Board;
  modalToggle: boolean;
  setCurrentBoard?: (state: any) => void;
  setModalToggle: (state: any) => void;
}

export interface MenuProps {
  modalToggle: boolean;
  setModalToggle: (state: any) => void;
  boardToggle: boolean;
  setBoardToggle: (state: any) => void;
  deleteToggle: boolean;
  setDeleteToggle: (state: any) => void;
}
