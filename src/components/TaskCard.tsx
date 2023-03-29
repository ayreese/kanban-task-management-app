import React, { useState } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { Task as _Task } from "@/interfaces/interfaces";

const TaskCard = ({ title, description, subtasks, changeToggle }: _Task) => {
  const [completed, setCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const checkHandler = () => {
    setCompleted(!completed);
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const close = () => changeToggle!(false);
  return (
    <div className="taskCardWrapper">
      <div className="taskAndMenuContainer">
        <p>{title}</p>
        <Image src={menu} alt={menu} />
      </div>
      <p className="details">{description}</p>
      <div className="subtaskContainer">
        {subtasks && (
          <>
            <p>
              <span className="taskCount">subtasks</span> (2 of 3)
            </p>
            <div className="subtaskWrapper">
              {subtasks!.map((subtask) => {
                return (
                  <div className="checkboxWrapper">
                    <input type="checkbox" name="" id="" />
                    <p
                      className={`${
                        subtask.status === "completed" ? "completed" : ""
                      }`}>
                      {subtask.name}
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
        <ul
          onClick={toggleDropDown}
          className={`statusList ${isOpen ? "open" : ""}`}>
          <div className="statusWrapper">
            <li>todo</li>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                stroke-width="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>{" "}
          </div>
          <div className="statusWrapper">
            <li>in progress</li>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                stroke-width="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>{" "}
          </div>
          <div className="statusWrapper">
            <li>completed</li>
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="#635FC7"
                stroke-width="2"
                fill="none"
                d="m1 1 4 4 4-4"
              />
            </svg>{" "}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TaskCard;
