import { Task } from "@/interfaces/interfaces";
import React, { useState } from "react";
import TaskCard from "./TaskCard";

const Task = ({ id, name, body, subtasks, columnId, columnName }: Task) => {
  const [viewTask, setViewTask] = useState<boolean>(false);

  return (
    <div className="taskRowWrapper">
      {viewTask && (
        <TaskCard
          id={id}
          name={name}
          body={body}
          subtasks={subtasks}
          columnId={columnId}
          columnName={columnName}
          taskCardOpen={{ state: viewTask, setState: setViewTask }}
        />
      )}
      <div className="task" onClick={() => setViewTask(!viewTask)}>
        <p className="taskTitle">{name}</p>
        <p className="subtaskCount">{`${subtasks?.length} subtask`}</p>
      </div>
    </div>
  );
};

export default Task;
