import { Task } from "@/interfaces/interfaces";
import React, { useState } from "react";
import MenuModal from "./Modal";
import TaskCard from "./TaskCard";

const Task = ({ title, description, subtasks }: Task) => {
  const [viewTask, setViewTask] = useState(false);
  const checkHandler = () => {
    setViewTask(!viewTask);
  };
  return (
    <div className="taskRowWrapper">
      {viewTask && (
        <MenuModal
          type="task"
          title={title}
          description={description}
          subtasks={subtasks}
          changeToggle={setViewTask}
        />
      )}
      <div className="task" onClick={checkHandler}>
        <p className="taskTitle">{title}</p>
        <p className="subtaskCount">0 of 1 subtask</p>
      </div>
    </div>
  );
};

export default Task;
