import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { CreateBoard } from "@/interfaces/interfaces";
import { CREATE_BOARD } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";

/*
Abbreviations
React-hook-form = RHF
*/

interface CreateBoardProps {
  setCurrentBoard: (state: any) => void;
  modalToggle: boolean;
  setModalToggle: (state: any) => void;
}

/* General component to create new items e.g. boards, tasks */
const CreateBoard = ({
  setCurrentBoard,
  modalToggle,
  setModalToggle,
}: CreateBoardProps) => {
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
  } = useForm<CreateBoard>({
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
  const onSubmit: SubmitHandler<CreateBoard> = async (data: CreateBoard) => {
    try {
      const result = await createBoard({
        variables: {
          name: data.name,
          columns: data.columns,
        },
        refetchQueries: [{ query: GET_BOARDS }],
        onCompleted(data) {
          setModalToggle(!modalToggle);
          // setCurrentBoard(data.createBoard);
          window.sessionStorage.setItem(
            "currentBoard",
            JSON.stringify(data.createBoard),
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
          <p>Create new board</p>
          <Image src={menu} alt={menu} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="createForm">
          <input {...register("name")} placeholder="Board Name" />
          {fields.map((fields, index) => {
            return (
              <div key={index}>
                <div className="columnInputContainer">
                  <div className="columnInputWrapper">
                    <input
                      {...register(`columns.${index}.name`)}
                      placeholder="column"
                    />
                    <input
                      {...register(`columns.${index}.color`)}
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
