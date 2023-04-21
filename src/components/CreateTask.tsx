import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { CreateColumnProps, CreateTask } from "@/interfaces/interfaces";
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
}: CreateColumnProps) => {
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
  } = useForm<CreateTask>({
    /* Default values need for field using useFieldArray from RHF */
    // defaultValues: {
    //   columns: [{ name: "", color: "" }],
    // },
  });
  //   const { fields, append, remove } = useFieldArray({
  //     name: "columns",
  //     control,
  //   });

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<CreateTask> = async (data: CreateTask) => {
    try {
      const result = await createTask({
        variables: {
          name: data.name,
          body: data.body,
          columnId: data.columnId,
        },
        refetchQueries: [{ query: GET_BOARDS }],
        onCompleted(data) {
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
          <Image src={menu} alt={menu} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="createForm">
          <input {...register("name")} placeholder="Task" />
          <input {...register("body")} placeholder="Description" />
          <select id="columnSelect" {...register("columnId")}>
            {currentBoard.columns.map((column) => {
              return (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              );
            })}
          </select>
          {/* {fields.map((fields, index) => {
            return (
              <div key={index}>
                <input
                  {...register(`columns.${index}.name`)}
                  placeholder="column"
                />
                <input
                  {...register(`columns.${index}.color`)}
                  placeholder="color"
                />
                <button type="button" onClick={() => remove(index)}>
                  x
                </button>
              </div>
            );
          })} */}

          {/* <button type="button" onClick={() => append({ name: "", color: "" })}>
            add column
          </button> */}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
