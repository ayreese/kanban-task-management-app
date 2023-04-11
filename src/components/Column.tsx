import React from "react";
import Task from "./Task";
import { Column as column } from "@/interfaces/interfaces";

const Column = ({ name, color, tasks }: column) => {
  return (
    <div className="columnWrapper">
      <div className="statusWrapper">
        <div className={`statusColor ${color}`}></div>
        <p className="statusName">{name}</p>
      </div>

      {tasks &&
        tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            description={task.description}
            subtasks={task.subtasks}
          />
        ))}
    </div>
  );
};

export default Column;
