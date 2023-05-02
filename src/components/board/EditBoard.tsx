import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  EditBoard as _EditBoard,
  CreationProps,
  Board,
} from "@/interfaces/interfaces";
import { CREATE_BOARD, DELETE_COLUMN, EDIT_BOARD } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";

/*
Abbreviations
React-hook-form = RHF
*/

/* General component to create new items e.g. boards, tasks */
const EditBoard = ({
  currentBoard,
  setCurrentBoard,
  modalToggle,
  setModalToggle,
}: CreationProps) => {
  /* GraphQl mutation to create boards */
  const [
    editBoard,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_BOARD);
  const [
    deleteColumn,
    { data: deletedData, loading: deletedLoading, error: deletedError },
  ] = useMutation(DELETE_COLUMN);
  /* React-hook-form hook to create form */

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Board>({
    /* Default values need for field using useFieldArray from RHF */
    defaultValues: {
      name: currentBoard.name,
      columns: currentBoard.columns,
    },
  });
  /* Hook from RHF to add & delete column fields */
  const { fields, append, remove, replace } = useFieldArray({
    name: "columns",
    keyName: JSON.stringify(
      currentBoard.columns.map((field) => ({ ...field, id: field.id })),
    ),
    control,
  });

  const deleteColumns = async (id: string) => {
    console.log("field ID", id);
    try {
      await deleteColumn({
        variables: {
          boardId: currentBoard.id,
          columnId: id,
        },
        onCompleted(data, clientOptions) {
          // setModalToggle(true);
          console.log("complete data", data);
          window.sessionStorage.setItem!(
            "currentBoard",
            JSON.stringify(data.deleteColumn),
          );
        },
      });
    } catch (error) {
      console.log("Could not delete board", error);
    }
  };

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<Board> = async (data: Board) => {
    const newColumns = data.columns.map((column) => {
      if (column.id) {
        return { id: column.id, name: column.name, color: column.color };
      } else {
        return { name: column.name, color: column.color };
      }
    });
    console.log("new array", newColumns);

    try {
      const result = await editBoard({
        variables: {
          boardId: currentBoard.id,
          newName: data.name,
          columns: newColumns,
        },
        refetchQueries: [{ query: GET_BOARDS }],
        onCompleted(data) {
          console.log("what we send", data);
          setModalToggle(!modalToggle);
          window.sessionStorage.setItem(
            "currentBoard",
            JSON.stringify(data.updateBoard),
          );
        },
      });
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  /* JSX return value */
  return (
    <div className="cardContainer" onClick={() => setModalToggle(!modalToggle)}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="menuContainer">
          <p>Edit board</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="createForm">
          <input
            {...register("name", { required: true })}
            placeholder="Board Name"
          />
          {errors.name && <span className="error">Board name is required</span>}
          {fields.map((fields, index) => {
            return (
              <div key={index}>
                <div className="inputContainer">
                  <div className="inputWrapper">
                    <input
                      {...register(`columns.${index}.name`, { required: true })}
                      placeholder="column"
                    />
                    <input
                      {...register(`columns.${index}.color`, {
                        required: true,
                      })}
                      placeholder="color"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      remove(index), deleteColumns(fields.id!);
                    }}
                    className="closeBtn">
                    x
                  </button>
                </div>
                {errors.columns && (
                  <span className="error">
                    Both column & color required or delete
                  </span>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => append({ name: "", color: "" })}
            className="addBtn">
            + add column
          </button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditBoard;
