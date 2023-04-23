import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { EditBoard, CreationProps } from "@/interfaces/interfaces";
import { CREATE_BOARD, EDIT_BOARD } from "@/graphql/mutations";
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
  /* React-hook-form hook to create form */
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditBoard>({
    /* Default values need for field using useFieldArray from RHF */
    defaultValues: {
      name: currentBoard.name,
    },
  });

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<EditBoard> = async (data: EditBoard) => {
    try {
      const result = await editBoard({
        variables: {
          boardId: currentBoard.id,
          newName: data.name,
        },
        refetchQueries: [{ query: GET_BOARDS }],
        onCompleted(data) {
          setModalToggle(!modalToggle);
          //   setCurrentBoard!(data.createBoard);
          //   window.sessionStorage.setItem(
          //     "currentBoard",
          //     JSON.stringify(data.createBoard),
          //   );
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditBoard;
