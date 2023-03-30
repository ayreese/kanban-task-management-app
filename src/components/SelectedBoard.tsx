import React, { useState } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import Columns from "./Columns";
import { SelectBoard as _SelectBoard } from "@/interfaces/interfaces";
import MenuModal from "./Modal";

const SelectedBoard = ({ boards, index, total, toggle }: _SelectBoard) => {
  const [user, setUser] = useState(false);
  const checkHandler = () => {
    setUser(!user);
  };
  return (
    <div className="selectedBoardArea">
      {user && (
        <MenuModal
          type="login"
          title="title"
          description="description"
          changeToggle={checkHandler}
        />
      )}
      <div className="selectedBoardOptionsWrapper">
        <p className="selectedBoardNameXl">
          {user ? boards[index].name : "welcome to kanban"}
        </p>
        <div className="newTaskWrapper">
          {user ? (
            <>
              <button className="newTaskBtn">+ add new task</button>
              <button className="menuBtn">
                <Image src={menu} alt="menu" />
              </button>
            </>
          ) : (
            <>
              <button onClick={checkHandler} className="newTaskBtn">
                Login
              </button>
            </>
          )}
        </div>
      </div>
      <div className={`boardColumnsWrapper ${toggle ? "" : "hide2"}`}>
        {total === 0 ? (
          <div className="createNewBoardWrapper">
            <p>This board is empty create a new column to get started.</p>
            <button className="createNewBoardBtn"> add new board</button>
          </div>
        ) : (
          // <></>
          <Columns
            id={boards[index].id}
            name={boards[index].name}
            columns={boards[index].columns}
          />
        )}
      </div>
    </div>
  );
};

export default SelectedBoard;
