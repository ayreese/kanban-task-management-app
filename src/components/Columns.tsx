import React from "react";
import Column from "./Column";
import { Boards } from "../interfaces/interfaces";

const Columns = ({ id, name, columns }: Boards) => {
  return (
    <>
      <div className="boardColumn">
        {columns.map((column) => (
          <Column
            name={column.name}
            color={column.color}
            tasks={column.tasks}
          />
        ))}
        <div className="newColumnButtonWrapper">
          <button>+ add column</button>
        </div>
      </div>
    </>
  );
};

export default Columns;
