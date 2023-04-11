import React, { useState } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import { Modal as _Task } from "@/interfaces/interfaces";
import TaskCard from "./TaskCard";
import Login from "./Login";

const MenuModal = ({ type, name, body, subtasks, changeToggle }: _Task) => {
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
    <div className="taskCardContainer">
      <div className="closeBtn">
        <button onClick={close}>X</button>
      </div>
      {type === "task" && (
        <TaskCard
          title={title}
          description={description}
          subtasks={subtasks}
          changeToggle={changeToggle}
        />
      )}
    </div>
  );
};

export default MenuModal;
