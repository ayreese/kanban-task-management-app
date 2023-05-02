import React, { useEffect, useState } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import {
  TaskMutationProps,
  TaskProps,
  Task as _Task,
} from "@/interfaces/interfaces";
import { UPDATE_SUBTASK } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_BOARDS, GET_SUBTASKS } from "@/graphql/query";
import Menu from "../Menu";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

const TaskCard = ({
  id,
  name,
  body,
  subtasks,
  columnName,
  columnId,
  taskCardOpen,
}: TaskProps) => {
  /* state for menu to open to edit and delete task */
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  /* state for modal to edit task */
  const [editTask, setEditTask] = useState<boolean>(false);
  /* state for modal to edit task */
  const [cardView, setCardView] = useState<boolean>(false);
  /* state for modal to delete task */
  const [deleteTask, setDeleteTask] = useState<boolean>(false);
  /* filter subtasks with status completed */
  const completedSubtask = subtasks?.filter(
    (completed) => completed.status === "completed",
  );
  /* count for completed subtasks*/
  const completedSubCount = completedSubtask?.length;
  /* total subtasks*/
  const totalSubtask = subtasks?.length;
  /* GraphQL mutation to update subtask status */
  const [
    updateSubtask,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_SUBTASK, {
    refetchQueries: [{ query: GET_BOARDS }],
  });
  /* function that runs the GraphQL mutation */
  const updateSubtasks = (subtaskId: string, status: string) => {
    console.log("1st loading", mutationLoading);
    try {
      updateSubtask({
        variables: {
          subtaskId: subtaskId,
          status: status,
        },
        refetchQueries: [{ query: GET_SUBTASKS, variables: { taskId: id } }],
        onCompleted(data, clientOptions) {
          console.log("client options", clientOptions);
          console.log("data", data);
          console.log("2nd loading", mutationLoading);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return !cardView ? (
    <div
      className="cardContainer"
      onClick={() => taskCardOpen.setState!(!taskCardOpen.state)}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="menuContainer">
          <p>{name}</p>

          <button
            className="menuBtn"
            onClick={() => setMenuToggle(!menuToggle)}>
            <Image src={menu} alt="menu" />
          </button>
          {menuToggle && (
            <Menu
              menuToggle={{ state: menuToggle, setState: setMenuToggle }}
              editToggle={{ state: editTask, setState: setEditTask }}
              deleteToggle={{ state: deleteTask, setState: setDeleteTask }}
              currentView={{
                state: cardView,
                setState: setCardView,
              }}
            />
          )}
        </div>
        <p className="details">{body}</p>
        <div className="subtaskContainer">
          {subtasks && (
            <>
              <p>
                {totalSubtask! > 0 && (
                  <>
                    {" "}
                    <span className="taskCount">subtasks</span>{" "}
                    {`${completedSubCount} of ${totalSubtask}`}
                  </>
                )}
              </p>
              <div className="subtaskWrapper">
                {subtasks!.map((subtask, index) => {
                  // console.log("subtask", subtask);
                  if (subtask.status === "COMPLETE") {
                    return (
                      <div className="checkboxWrapper" key={subtask.id}>
                        <input
                          type="checkbox"
                          name="status"
                          checked
                          onChange={() =>
                            updateSubtasks(subtask.id!, "INCOMPLETE")
                          }
                        />
                        <p className={subtask.status}>{subtask.body}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div className="checkboxWrapper" key={subtask.id}>
                        <input
                          type="checkbox"
                          name="status"
                          onChange={() =>
                            updateSubtasks(subtask.id!, "COMPLETE")
                          }
                        />
                        <p className={subtask.status}>{subtask.body}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          )}
        </div>
        <div className="statusContainer">
          <p>current status</p>
          {columnName}
        </div>
      </div>
    </div>
  ) : (
    <>
      {editTask && (
        <EditTask
          id={id}
          name={name}
          body={body}
          subtasks={subtasks}
          columnId={columnId}
          columnName={columnName}
          taskCardOpen={{ state: editTask, setState: setEditTask }}
          editView={{ state: editTask, setState: setEditTask }}
        />
      )}
      {deleteTask && (
        <DeleteTask
          id={id}
          name={name}
          body={body}
          columnId={columnId}
          columnName={columnName}
          cardToggle={{ state: deleteTask, setState: setDeleteTask }}
          editView={{ state: cardView, setState: setCardView }}
        />
      )}
    </>
  );
};

export default TaskCard;
