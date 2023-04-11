import React from "react";
import Column from "./Column";
import { Board, Column as _Column } from "../interfaces/interfaces";

const Columns = ({ columns }: { columns: _Column[] }) => {
  return (
    <>
      <div className="boardColumn">
        {columns.map((column, index) => (
          <Column
            key={index}
            name={column.name}
            // color={column.color}
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
