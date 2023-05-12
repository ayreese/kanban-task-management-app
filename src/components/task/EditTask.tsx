import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Task as _Task, TaskMutationProps } from "@/interfaces/interfaces";
import { DELETE_SUBTASK, EDIT_TASK } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";
import { useContext } from "react";
import { BoardContext } from "../board/BoardSelection";

/*
Abbreviations
React-hook-form = RHF
*/

/* Component to edit tasks */
const EditTask = ({
  id,
  name,
  body,
  subtasks,
  editView,
  columnId,
}: TaskMutationProps) => {
  /*Current board from context */
  const board = useContext(BoardContext);
  console.log("current column", columnId);
  console.log(
    "list of columns",
    board?.columns.map((column) => {
      return column.id;
    }),
  );

  /* GraphQl mutation to create task */
  const [
    editTask,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_TASK);
  const [
    deleteSubtask,
    { data: deletedData, loading: deletedLoading, error: deletedError },
  ] = useMutation(DELETE_SUBTASK);
  /* React-hook-form hook to create form */
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<_Task>({
    /* Default values need for field using useFieldArray from RHF */
    defaultValues: {
      name: name,
      body: body,
      subtasks: subtasks,
    },
  });
  /* Field array to add and remove subtasks dynamically -See rhf- */
  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    keyName: JSON.stringify(
      subtasks!.map((field) => ({ ...field, id: field.id })),
    ),
    control,
  });

  const deleteSubtasks = async (subId: string) => {
    console.log("field ID", id);
    try {
      await deleteSubtask({
        variables: {
          boardId: board?.id,
          columnId: columnId,
          taskId: id,
          subtaskId: subId,
        },
        onCompleted(data, clientOptions) {
          window.sessionStorage.setItem!(
            "currentBoard",
            JSON.stringify(data.deleteSubtask),
          );
        },
      });
    } catch (error) {
      console.log("Could not delete board", error);
    }
  };

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<_Task> = async (data: _Task) => {
    console.log("new data from edit task", data);
    const newSubtasks =
      data.subtasks &&
      data.subtasks.map((subtask) => {
        if (subtask.id) {
          return { id: subtask.id, body: subtask.body, status: subtask.status };
        } else {
          return { body: subtask.body, status: subtask.status };
        }
      });

    try {
      const result = await editTask({
        variables: {
          boardId: board?.id,
          columnId: data.columnId,
          taskId: id,
          name: data.name,
          body: data.body,
          subtasks: newSubtasks,
        },
        refetchQueries: [{ query: GET_BOARDS }],
        onCompleted(data) {
          console.log("edited x data", data);
          console.log("edited y data", data.updateTask);

          editView.setState!(!editView.state);
          window.sessionStorage.setItem(
            "currentBoard",
            JSON.stringify(data.updateTask),
          );
        },
      });
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  /* JSX return value */
  return (
    <div
      className="cardContainer"
      onClick={() => editView.setState!(!editView.state)}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="menuContainer">
          <p>Edit Task</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="createForm">
          <input {...register("name")} placeholder="Task" />
          <textarea {...register("body")} placeholder="Description" />

          {fields.map((fields, index) => {
            return (
              <div key={index}>
                <div className="inputContainer">
                  <div className="inputWrapper">
                    <input
                      {...register(`subtasks.${index}.body`)}
                      placeholder="subtask"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      remove(index), deleteSubtasks(fields.id!);
                    }}
                    className="closeBtn">
                    x
                  </button>
                </div>
              </div>
            );
          })}
          <select id="columnSelect" {...register("columnId")}>
            {board?.columns.map((column) => {
              return (
                <option
                  key={column.id}
                  value={column.id}
                  selected={columnId === column.id}>
                  {column.name}
                </option>
              );
            })}
          </select>

          {
            <button
              type="button"
              onClick={() =>
                append({ id: "", taskId: "", body: "", status: "INCOMPLETE" })
              }
              className="addBtn">
              add subtasks
            </button>
          }
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditTask;
