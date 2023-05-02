// import { useState } from "react";
// import Columns from "../column/Columns";
// import { SelectBoard as _SelectBoard } from "@/interfaces/interfaces";
// import CreateTask from "../task/CreateTask";

// const SelectedBoard = ({ board, toggle, total }: _SelectBoard) => {
//   const [modalToggle, setModalToggle] = useState<boolean>(false);

//   return (
//     <div className="selectedBoardArea">
//       <div className={`boardColumnsWrapper ${toggle ? "" : "hide2"}`}>
//         {total === 0 ? (
//           <div className="createNewBoardWrapper">
//             <p>This board is empty create a new column to get started.</p>
//           </div>
//         ) : (
//           <Columns board={board} />
//         )}
//       </div>
//       {modalToggle && (
//         <CreateTask
//           currentBoard={board}
//           modalToggle={modalToggle}
//           setModalToggle={setModalToggle}
//         />
//       )}
//     </div>
//   );
// };

// export default SelectedBoard;
