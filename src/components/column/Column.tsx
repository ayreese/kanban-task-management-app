import React from "react";
import Task from "../task/Task";
import { Column as column } from "@/interfaces/interfaces";

const Column = ({ id, name, color, tasks }: column) => {
  return (
    <div className="columnWrapper">
      <div className="statusWrapper">
        <div
          className={`statusColor ${color}`}
          style={{ backgroundColor: `${color}` }}></div>
        <p className="statusName">{name}</p>
      </div>

      {tasks &&
        tasks.map((task, index) => (
          <Task
            id={task.id}
            key={index}
            name={task.name}
            body={task.body}
            subtasks={task.subtasks}
            columnId={id!}
            columnName={name}
          />
        ))}
    </div>
  );
};

export default Column;
