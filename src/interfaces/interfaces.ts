export interface Board {
  id: string;
  authorId: string;
  name: string;
  columns: Column[];
}

export interface Column {
  id?: string;
  boardId?: string;
  name: string;
  color?: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  name: string;
  body?: string;
  subtasks?: Subtask[];
  columnId: string;
  columnName: string;
}

export interface DeleteTaskProps extends Task {
  cardToggle: Toggle;
  editView: Toggle;
}

export interface TaskProps extends Task {
  taskCardOpen: Toggle;
}

export interface TaskMutationProps extends TaskProps {
  editView: Toggle;
}

export interface Subtask {
  id?: string;
  taskId?: string;
  body: string;
  status: string;
}

// export interface SelectBoard {
//   board: Board;
//   toggle: boolean;
//   total: number;
// }

export interface BoardSelection {
  boards: Board[];
  toggle: Toggle;
  // toggle: boolean;
  // setBoardSelectionToggle: (state: boolean) => void;
}

export interface Toggle {
  state: boolean;
  setState: (state: boolean) => void;
}

export interface Auth {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export type EditBoard = {
  name: string;
  columns: Column[];
};
export interface CreateColumn {
  name: string;
  color: string;
}

// export interface CreateTask {
//   name: string;
//   body: string;
//   subtasks: {
//     body: string;
//     status: string;
//   }[];
//   columnId: string;
// }

export interface EditTask {}
export interface CreateSubtask {
  body: string;
  status: string;
  taskId: string;
}

export interface CreationProps {
  boards?: Board[];
  currentBoard: Board;
  modalToggle: boolean;
  setCurrentBoard?: (state: any) => void;
  setModalToggle: (state: any) => void;
}

export interface MenuProps {
  menuToggle: Toggle;
  editToggle: Toggle;
  deleteToggle: Toggle;
  currentView?: Toggle;
  // modalToggle: boolean;
  // setModalToggle: (state: any) => void;
  // boardToggle: boolean;
  // setBoardToggle: (state: any) => void;
  // deleteToggle: boolean;
  // setDeleteToggle: (state: any) => void;
}

// export interface UserBoardData {
//   userBoards: UserBoard[];
// }

// export interface UserBoard {
//   __typename: string;
//   id: string;
//   name: string;
//   columns: Column[];
// }

// export interface Column {
//   __typename: string;
//   name: string;
//   tasks: null;
// }
