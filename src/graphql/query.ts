import { gql, useQuery } from "@apollo/client";

export const GET_BOARDS = gql`
  query userBoards {
    userBoards {
      id
      name
      columns {
        name
        tasks {
          name
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
        name
        tasks {
          name
          body
        }
      }
    }
  }
`;
