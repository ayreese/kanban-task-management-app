import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { CREATE_COLUMN } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";
import { CreateColumn, CreateColumnProps } from "@/interfaces/interfaces";

const CreateColumn = ({
  currentBoard,
  modalToggle,
  setModalToggle,
}: CreateColumnProps) => {
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
          console.log(data);
          setModalToggle(!modalToggle);
        },
      });
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  /* JSX return value */
  return (
    <div className="taskCardContainer">
      <div className="closeBtn">
        <button onClick={() => setModalToggle(!modalToggle)}>X</button>
      </div>
      <div className="taskCardWrapper">
        <div className="taskAndMenuContainer">
          <p>Create new board</p>
          <Image src={menu} alt={menu} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Column Name" />
          <input {...register("color")} placeholder="Color" />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateColumn;
