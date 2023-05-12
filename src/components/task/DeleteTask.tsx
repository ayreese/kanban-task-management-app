import { DELETE_TASK } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";
import { DeleteTaskProps, Task as _Task } from "@/interfaces/interfaces";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { BoardContext } from "../board/BoardSelection";

/*
Abbreviations
React-hook-form = RHF
*/

/* Component to delete tasks */
const DeleteTask = ({
  id,
  name,
  columnId,
  columnName,
  cardToggle,
  editView,
}: DeleteTaskProps) => {
  const board = useContext(BoardContext);
  const [deleteTask, { data: deletedData, loading, error }] =
    useMutation(DELETE_TASK);
  const onDelete = async () => {
    deleteTask({
      variables: {
        boardId: board?.id,
        columnId: columnId,
        taskId: id,
      },
      refetchQueries: [{ query: GET_BOARDS }],
      onCompleted(data, clientOptions) {
        console.log("from delete task", data);
        cardToggle.setState(!cardToggle.state);
        window.sessionStorage.setItem(
          "currentBoard",
          JSON.stringify(data.deleteTask),
        );
      },
    });
  };
  return (
    <div
      className="cardContainer"
      onClick={() => editView.setState(!editView.state)}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="confirmationWrapper">
          <div className="confirmationTxt">
            <h3>Delete this task?</h3>
            <p>
              Are you sure you want to delete the '{name}&apos;' task? This
              action will remove all subtasks and cannot be reversed.
            </p>
          </div>
          <div className="confirmationBtn">
            <button
              onClick={() => cardToggle.setState(!cardToggle.state)}
              className="cancelBtn">
              Cancel
            </button>
            <button onClick={() => onDelete()} className="deleteBtn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
