import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { CREATE_COLUMN } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";
import { CreateColumn, CreationProps } from "@/interfaces/interfaces";

const CreateColumn = ({
  currentBoard,
  modalToggle,
  setModalToggle,
}: CreationProps) => {
  /* GraphQl mutation to create boards */
  const [
    createColumn,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_COLUMN);
  /* React-hook-form hook to create form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateColumn>({});

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<CreateColumn> = async (data: CreateColumn) => {
    try {
      await createColumn({
        variables: {
          name: data.name,
          color: data.color,
          boardId: currentBoard.id,
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
          <p>Create new column</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="createForm">
          <input {...register("name")} placeholder="Column Name" />
          <input {...register("color")} placeholder="Color" />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateColumn;
