import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { CreateBoard } from "@/interfaces/interfaces";
import { CREATE_BOARD } from "@/graphql/mutations";
import { useEffect } from "react";
import { client } from "apollo-client";

/*
Abbreviations
React-hook-form = RHF
*/

/* General component to create new items e.g. boards, tasks */
const CreationModal = () => {
  /* GraphQl mutation to create boards */
  const [createBoard, { data, loading, error }] = useMutation(CREATE_BOARD);
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

  useEffect(() => {}, []);

  /* Function to handle data after form submission */
  const onSubmit: SubmitHandler<CreateBoard> = async (data: CreateBoard) => {
    try {
      const result = await createBoard({
        variables: {
          name: data.name,
          columns: data.columns,
        },
      });
      client.refetchQueries({ include: "all" });
      console.log("result", result);
      window.location.reload();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };
  /* JSX return value */
  return (
    <div className="taskCardContainer">
      <div className="closeBtn">
        <button onClick={close}>X</button>
      </div>
      <div className="taskCardWrapper">
        <div className="taskAndMenuContainer">
          <p>Create new board</p>
          <Image src={menu} alt={menu} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Board Name" />
          {fields.map((fields, index) => {
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
          })}

          <button type="button" onClick={() => append({ name: "", color: "" })}>
            add column
          </button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreationModal;
