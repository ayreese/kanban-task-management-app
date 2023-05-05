import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Board, CreationProps } from "@/interfaces/interfaces";
import { CREATE_BOARD } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";

/*
Abbreviations
React-hook-form = RHF
*/

/* General component to create new items e.g. boards, tasks */
const CreateBoard = ({
  setCurrentBoard,
  modalToggle,
  setModalToggle,
}: CreationProps) => {
  /* GraphQl mutation to create boards */

  const [
    createBoard,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_BOARD);
  /* React-hook-form hook to create form */
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Board>({
    /* Default values need for field using useFieldArray from RHF */
    defaultValues: {
      columns: [{ name: "", color: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "columns",

    control,
  });

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<Board> = async (data: Board) => {
    try {
      const result = await createBoard({
        variables: {
          name: data.name,
          columns: data.columns,
        },
        onCompleted(data) {
          setModalToggle(!modalToggle);
          window.sessionStorage.setItem!(
            "currentBoard",
            JSON.stringify(data.createBoard),
          );
        },
        refetchQueries: [{ query: GET_BOARDS }],
      });
    } catch (error) {}
  };
  /* JSX return value */
  if (mutationLoading) return <div>...Loading</div>;
  return (
    <div className="cardContainer" onClick={() => setModalToggle(!modalToggle)}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="menuContainer">
          <p>Add new board</p>
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
                    onClick={() => remove(index)}
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

export default CreateBoard;
