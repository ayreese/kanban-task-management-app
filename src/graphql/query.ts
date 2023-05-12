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
          columnId
          subtasks {
            id
            body
            status
            taskId
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

export const GET_SUBTASKS = gql`
  query Subtasks($taskId: String!) {
    subtasks(taskId: $taskId) {
      id
      body
      status
      taskId
    }
  }
`;
