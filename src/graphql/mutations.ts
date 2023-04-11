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
