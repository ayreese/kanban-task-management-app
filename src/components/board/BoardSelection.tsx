import React, { useState, useEffect, createContext, useContext } from "react";
import Image from "next/image";
import menu from "public/assets/icon-vertical-ellipsis.svg";
import logoInBlack from "public/assets/logo-dark.svg";
import mobileLogo from "public/assets/logo-mobile.svg";
import down from "public/assets/icon-chevron-down.svg";
import { Board, BoardSelection } from "@/interfaces/interfaces";
import darkSwitch from "public/assets/icon-dark-theme.svg";
import lightSwitch from "public/assets/icon-light-theme.svg";
import CreateBoard from "./CreateBoard";
import Columns from "../column/Columns";
import CreateTask from "../task/CreateTask";
import Menu from "../Menu";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";

/*
Board selection is the right side of the screen
*/
export const BoardContext = createContext<Board | null>(null);

const BoardSelection = ({ boards, toggle }: BoardSelection) => {
  /* counts total boards */
  const [total, setTotal] = useState<number>(0);
  /* state for modal to open to create new board*/
  const [newBoardModal, setNewBoardModal] = useState<boolean>(false);
  /* state to hide and show side panel*/
  const [hideBoard, setHideBoard] = useState<boolean>(false);
  /* state for modal to open to create new task*/
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  /* state for menu to open to edit and delete board */
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  /* state for modal to edit and delete board */
  const [editBoard, setEditBoard] = useState<boolean>(false);
  /* state for modal to edit and delete board */
  const [confirmationToggle, setConfirmationToggle] = useState<boolean>(false);
  /* state for current board */
  const [currentBoard, setCurrentBoard] = useState<Board>({
    id: "",
    authorId: "",
    name: "",
    columns: [],
  });

  useEffect(() => {
    if (boards) {
      setTotal(boards.length);
    }
    if (window.sessionStorage.getItem("currentBoard")) {
      setCurrentBoard(
        JSON.parse(window.sessionStorage.getItem("currentBoard")!),
      );
    } else if (boards.length > 0) {
      window.sessionStorage.setItem("currentBoard", JSON.stringify(boards[0]));
    }
  }, [boards]);

  return (
    <BoardContext.Provider value={currentBoard ? currentBoard : null}>
      <div className="boardContainerGrid">
        <div className="logoArea">
          <Image src={logoInBlack} alt="logo" />
        </div>
        <div className="selectedBoardOptionsWrapper">
          <div className="mobileLogoWrapper">
            <Image src={mobileLogo} alt="logo" className="mobileLogo" />
            <p className="selectedBoardNameXl">
              {currentBoard ? currentBoard.name : "Create New Board"}
            </p>
            <Image
              src={down}
              alt="down-arrow"
              className="downArrow"
              onClick={() => setHideBoard(!hideBoard)}
            />
          </div>
          <div className="newTaskWrapper">
            <button
              disabled={currentBoard.columns.length === 0}
              className="newTaskBtn"
              onClick={() => setNewTaskModal(!newTaskModal)}>
              + <p>add new task</p>
            </button>
            <button
              className="menuBtn"
              onClick={() => setMenuToggle(!menuToggle)}>
              <Image src={menu} alt="menu" />
            </button>
            {menuToggle && (
              <Menu
                menuToggle={{ state: menuToggle, setState: setMenuToggle }}
                editToggle={{ state: editBoard, setState: setEditBoard }}
                deleteToggle={{
                  state: confirmationToggle,
                  setState: setConfirmationToggle,
                }}
              />
            )}
            {confirmationToggle && (
              <DeleteBoard
                boards={boards}
                currentBoard={currentBoard}
                modalToggle={confirmationToggle}
                setModalToggle={setConfirmationToggle}
              />
            )}
          </div>
        </div>
        <div className={`boardSelectionArea ${hideBoard ? "hide" : ""}`}>
          <div className="boardSelectionWrapper">
            <p className="allBoardsMdBody">all boards ({total})</p>
            <div className="boardsWrapper">
              <ul className="boards">
                {boards &&
                  boards.map((board) => (
                    <li
                      key={board.id}
                      className={`board ${
                        board.id === currentBoard.id && "active"
                      }`}>
                      <svg
                        className="eye"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                          fill={
                            board.id === currentBoard.id ? "#fff" : "#828FA3"
                          }
                        />
                      </svg>
                      <button
                        onClick={() => {
                          setCurrentBoard(() => board);
                          window.sessionStorage.setItem!(
                            "currentBoard",
                            JSON.stringify(board),
                          );
                        }}>
                        {board.name}
                      </button>
                    </li>
                  ))}{" "}
                <li className="board newBoardButton">
                  <svg
                    className="eye"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill="#635FC7"
                    />
                  </svg>
                  <button onClick={() => setNewBoardModal(!newBoardModal)}>
                    + create new board
                  </button>
                </li>
              </ul>
            </div>
            <div className="boardPanelOptions">
              <div className="switchWrapper">
                <Image src={lightSwitch} alt="light theme switch" />
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <Image src={darkSwitch} alt="dark theme switch" />
              </div>
              <div
                className={`hideSideBarWrapper ${hideBoard ? "toggle" : ""}`}>
                <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                    fill={hideBoard ? "#828FA3" : "#fff"}
                  />
                </svg>
                <button
                  onClick={() => setHideBoard(!hideBoard)}
                  className={`${hideBoard ? "button" : ""}`}>
                  hide sidebar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`boardColumnsWrapper ${hideBoard ? "hide2" : ""}`}>
          {total === 0 ? (
            <div className="createNewBoardWrapper">
              <p>This board is empty create a new column to get started.</p>
              {/* <button className="createNewBoardBtn"> add new board</button> */}
            </div>
          ) : (
            <Columns board={currentBoard} />
          )}
        </div>

        {newTaskModal && (
          <CreateTask
            currentBoard={currentBoard}
            modalToggle={newTaskModal}
            setModalToggle={setNewTaskModal}
          />
        )}
        {newBoardModal && (
          <CreateBoard
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}
            modalToggle={newBoardModal}
            setModalToggle={setNewBoardModal}
          />
        )}
        {editBoard && (
          <EditBoard
            currentBoard={currentBoard}
            setCurrentBoard={setCurrentBoard}
            modalToggle={editBoard}
            setModalToggle={setEditBoard}
          />
        )}
      </div>
    </BoardContext.Provider>
  );
};

export default BoardSelection;
