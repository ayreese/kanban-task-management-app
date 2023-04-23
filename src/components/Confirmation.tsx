import { DELETE_BOARD } from "@/graphql/mutations";
import { GET_BOARDS } from "@/graphql/query";
import { CreationProps } from "@/interfaces/interfaces";
import { useMutation } from "@apollo/client";

const Confirmation = ({
  currentBoard,
  modalToggle,
  setModalToggle,
}: CreationProps) => {
  const [deleteBoard, { data: deletedData, loading, error }] =
    useMutation(DELETE_BOARD);
  const onDelete = async () => {
    deleteBoard({
      variables: {
        boardId: currentBoard.id,
      },
      refetchQueries: [{ query: GET_BOARDS }],
      onCompleted(data, clientOptions) {
        setModalToggle(!modalToggle);
        console.log("client options", clientOptions);
        console.log(data);
      },
    });
  };
  return (
    <div className="cardContainer" onClick={() => setModalToggle(!modalToggle)}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="confirmationWrapper">
          <div className="confirmationTxt">
            <h3>Delete this board?</h3>
            <p>
              Are you sure you want to delete the '{currentBoard.name}' board?
              This action will remove all columns and tasks and cannot be
              reversed.
            </p>
          </div>
          <div className="confirmationBtn">
            <button
              onClick={() => setModalToggle(!modalToggle)}
              className="cancelBtn">
              Cancel
            </button>
            <button onClick={() => onDelete()} className="deleteBtn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
