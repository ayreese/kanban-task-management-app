import { gql, useQuery } from "@apollo/client";

export const GET_BOARDS = gql`
  query userBoards {
    userBoards {
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

export const GET_BOARD = gql`
  query board($id: string) {
    board(id: $id) {
      name
      columns {
        id
        name
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
