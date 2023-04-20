import { useState } from "react";
import CreateColumn from "./CreateColumn";

import Column from "./Column";
import { Board, Column as _Column } from "../interfaces/interfaces";
import CreateTask from "./CreateTask";

const Columns = ({ board }: { board: Board }) => {
  const [createColumnToggle, setCreateColumnToggle] = useState<boolean>(false);
  const [createTaskToggle, setCreateTaskToggle] = useState<boolean>(false);

  const { id, name, columns } = board;
  console.log("This is columns", columns);

  return (
    <>
      <div className="boardColumn">
        {columns.map((column, index) => (
          <Column
            key={index}
            id={column.id}
            name={column.name}
            color={column.color}
            tasks={column.tasks}
            columns={columns}
          />
        ))}
        <div className="newColumnButtonWrapper">
          <button onClick={() => setCreateColumnToggle(!createColumnToggle)}>
            + add column
          </button>
        </div>
      </div>
      {createColumnToggle && (
        <CreateColumn
          currentBoard={board}
          modalToggle={createColumnToggle}
          setModalToggle={setCreateColumnToggle}
        />
      )}
      {createTaskToggle && (
        <CreateTask
          currentBoard={board}
          modalToggle={createTaskToggle}
          setModalToggle={setCreateTaskToggle}
        />
      )}
    </>
  );
};

export default Columns;
