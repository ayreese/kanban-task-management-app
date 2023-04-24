import React, { useState } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { Task as _Task } from "@/interfaces/interfaces";

const TaskCard = ({ name, body, subtasks, changeToggle, columns }: _Task) => {
  const close = () => changeToggle!(false);
  const completedSubtask = subtasks?.filter(
    (completed) => completed.status === "completed",
  );
  const completedSubCount = completedSubtask?.length;
  const totalSubtask = subtasks?.length;
  return (
    <div className="cardContainer" onClick={close}>
      <div
        className="cardWrapper"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="menuContainer">
          <p>{name}</p>
          <Image src={menu} alt={menu} />
        </div>
        <p className="details">{body}</p>
        <div className="subtaskContainer">
          {subtasks && (
            <>
              <p>
                <span className="taskCount">subtasks</span>{" "}
                {`${completedSubCount} of ${totalSubtask}`}
              </p>
              <div className="subtaskWrapper">
                {subtasks!.map((subtask, index) => {
                  return (
                    <div className="checkboxWrapper" key={subtask.id}>
                      <input type="checkbox" name="" id="" />
                      <p
                        className={`${
                          subtask.status === "completed" ? "completed" : ""
                        }`}>
                        {subtask.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div className="statusContainer">
          <p>current status</p>
          <select id="cars">
            {columns.map((column) => {
              return <option value={column.name}>{column.name}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;