import { Task } from "@/interfaces/interfaces";
import React from "react";

const Task = ({ title, description, subtasks }: Task) => {
  const red = "red";
  return (
    <div className="taskRowWrapper">
      <div className="task">
        <p className="taskTitle">{title}</p>
        <p className="subtaskCount">0 of 1 subtask</p>
      </div>
    </div>
  );
};

export default Task;
