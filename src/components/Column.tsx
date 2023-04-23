import React from "react";
import Task from "./Task";
import { Column as column } from "@/interfaces/interfaces";

const Column = ({ name, color, tasks, columns }: column) => {
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
            key={index}
            name={task.name}
            body={task.body}
            subtasks={task.subtasks}
            columns={columns}
          />
        ))}
    </div>
  );
};

export default Column;
