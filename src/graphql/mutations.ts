import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation CreateBoard($name: String, $columns: [ColumnInputType]) {
    createBoard(name: $name, columns: $columns) {
      id
      name
      columns {
        id
        name
        color
      }
    }
  }
`;

export const EDIT_BOARD = gql`
  mutation UpdateBoard(
    $boardId: String!
    $newName: String!
    $columns: [ColumnInputType]
  ) {
    updateBoard(boardId: $boardId, newName: $newName, columns: $columns) {
      id
      name
      columns {
        boardId
        id
        name
        color
        tasks {
          columnId
          id
          name
          body
          subtasks {
            taskId
            id
            body
            status
          }
        }
      }
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId) {
      id
      name
    }
  }
`;

export const CREATE_COLUMN = gql`
  mutation CreateColumn($name: String!, $color: String!, $boardId: String) {
    createColumn(name: $name, color: $color, boardId: $boardId) {
      id
      name
      columns {
        id
        name
        color
      }
    }
  }
`;

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($boardId: String, $columnId: String) {
    deleteColumn(boardId: $boardId, columnId: $columnId) {
      id
      name
      columns {
        id
        name
        color
        tasks {
          id
          name
          body
          subtasks {
            id
            body
            status
          }
        }
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $boardId: String
    $columnId: String
    $name: String
    $body: String
    $subtasks: [SubtaskInputType]
  ) {
    createTask(
      boardId: $boardId
      columnId: $columnId
      name: $name
      body: $body
      subtasks: $subtasks
    ) {
      id
      name
      columns {
        id
        name
        color
        tasks {
          id
          name
          body
          subtasks {
            id
            body
            status
          }
        }
      }
    }
  }
`;

export const EDIT_TASK = gql`
  mutation UpdateTask(
    $boardId: String
    $columnId: String
    $taskId: String
    $name: String
    $body: String
    $subtasks: [SubtaskInputType]
  ) {
    updateTask(
      boardId: $boardId
      columnId: $columnId
      taskId: $taskId
      name: $name
      body: $body
      subtasks: $subtasks
    ) {
      id
      name
      columns {
        id
        name
        color
        tasks {
          id
          name
          body
          subtasks {
            id
            body
            status
          }
        }
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($boardId: String, $columnId: String, $taskId: String!) {
    deleteTask(boardId: $boardId, columnId: $columnId, taskId: $taskId) {
      id
      name
      columns {
        id
        name
        color
        tasks {
          id
          name
          body
          subtasks {
            id
            body
            status
          }
        }
      }
    }
  }
`;

export const DELETE_SUBTASK = gql`
  mutation DeleteSubtask(
    $boardId: String
    $columnId: String
    $taskId: String
    $subtaskId: String
  ) {
    deleteSubtask(
      boardId: $boardId
      columnId: $columnId
      taskId: $taskId
      subtaskId: $subtaskId
    ) {
      id
      name
      columns {
        id
        name
        color
        tasks {
          id
          name
          body
          subtasks {
            id
            body
            status
          }
        }
      }
    }
  }
`;

export const UPDATE_SUBTASK = gql`
  mutation UpdateSubtask(
    $boardId: String
    $columnId: String
    $taskId: String
    $subtaskId: String
    $status: Status
  ) {
    updateSubtask(
      boardId: $boardId
      columnId: $columnId
      taskId: $taskId
      subtaskId: $subtaskId
      status: $status
    ) {
      id
      name
      columns {
        id
        name
        color
        tasks {
          id
          name
          body
          subtasks {
            id
            body
            status
          }
        }
      }
    }
  }
`;
