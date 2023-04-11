import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import Columns from "./Columns";
import { SelectBoard as _SelectBoard } from "@/interfaces/interfaces";
import { useQuery } from "@apollo/client";
import { GET_BOARD } from "../graphql/query";

const SelectedBoard = ({ board, toggle, total }: _SelectBoard) => {
  return (
    <div className="selectedBoardArea">
      <div className="selectedBoardOptionsWrapper">
        <p className="selectedBoardNameXl">
          {board ? board.name : "Create New Board"}
        </p>
        <div className="newTaskWrapper">
          <>
            <button className="newTaskBtn">+ add new task</button>
            <button className="menuBtn">
              <Image src={menu} alt="menu" />
            </button>
          </>
        </div>
      </div>
      {/* toggle boolean is used to select class to move board */}
      <div className={`boardColumnsWrapper ${toggle ? "" : "hide2"}`}>
        {total === 0 ? (
          <div className="createNewBoardWrapper">
            <p>This board is empty create a new column to get started.</p>
            {/* <button className="createNewBoardBtn"> add new board</button> */}
          </div>
        ) : (
          <Columns columns={board.columns} />
        )}
      </div>
    </div>
  );
};

export default SelectedBoard;
