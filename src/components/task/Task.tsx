import { Task } from "@/interfaces/interfaces";
import React, { useState } from "react";
import TaskCard from "./TaskCard";

const Task = ({ name, body, subtasks, columns }: Task) => {
  const [viewTask, setViewTask] = useState(false);
  const checkHandler = () => {
    setViewTask(!viewTask);
  };
  return (
    <div className="taskRowWrapper">
      {viewTask && (
        <TaskCard
          name={name}
          body={body}
          subtasks={subtasks}
          changeToggle={setViewTask}
          columns={columns}
        />
      )}
      <div className="task" onClick={checkHandler}>
        <p className="taskTitle">{name}</p>
        <p className="subtaskCount">{`${subtasks?.length} subtask`}</p>
      </div>
    </div>
  );
};

export default Task;
