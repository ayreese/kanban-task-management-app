import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { CreationProps, Task } from "@/interfaces/interfaces";
import { CREATE_TASK } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";

/*
Abbreviations
React-hook-form = RHF
*/

/* General component to create new items e.g. boards, tasks */
const CreateTask = ({
  currentBoard,
  modalToggle,
  setModalToggle,
}: CreationProps) => {
  /* GraphQl mutation to create boards */
  const [
    createTask,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_TASK);

  /* React-hook-form hook to create form */
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Task>({
    /* Default values need for field using useFieldArray from RHF */
    defaultValues: {
      subtasks: [{ body: "", status: "INCOMPLETE" }],
    },
  });
  /* Field array to add and remove subtasks dynamically -See rhf- */
  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<Task> = async (data: Task) => {
    console.log("data", data);
    try {
      const result = await createTask({
        variables: {
          boardId: currentBoard.id,
          columnId: data.columnId,
          name: data.name,
          body: data.body,
          subtasks: data.subtasks,
        },
        refetchQueries: [{ query: GET_BOARDS }],
        onCompleted(data) {
          window.sessionStorage.setItem!(
            "currentBoard",
            JSON.stringify(data.createTask),
          );
          setModalToggle(!modalToggle);
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
          <p>Create new task</p>
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
                    onClick={() => remove(index)}
                    className="closeBtn">
                    x
                  </button>
                </div>
              </div>
            );
          })}
          <select id="columnSelect" {...register("columnId")}>
            {currentBoard.columns.map((column) => {
              return (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              );
            })}
          </select>
          {
            <button
              type="button"
              onClick={() => append({ body: "", status: "INCOMPLETE" })}
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

export default CreateTask;
