export interface UserBoardData {
  userBoards: UserBoard[];
}

export interface UserBoard {
  __typename: string;
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  __typename: string;
  name: string;
  tasks: null;
}
