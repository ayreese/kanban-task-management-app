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
  mutation EditBoard($boardId: String!, $newName: String!) {
    updateBoard(boardId: $boardId, newName: $newName) {
      id
      name
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
      color
      boardId
      tasks {
        id
        name
        body
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($columnId: String, $name: String, $body: String) {
    createTask(columnId: $columnId, name: $name, body: $body) {
      id
      name
      body
      columnId
    }
  }
`;
