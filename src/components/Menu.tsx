import { DELETE_BOARD } from "@/graphql/mutations";
import { Board, CreationProps, MenuProps } from "@/interfaces/interfaces";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import EditBoard from "./board/EditBoard";

const Menu = ({
  modalToggle,
  setModalToggle,
  boardToggle,
  setBoardToggle,
  deleteToggle,
  setDeleteToggle,
}: MenuProps) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div className="menu">
        <button
          onClick={() => {
            setBoardToggle(!boardToggle);
            setModalToggle(!modalToggle);
          }}>
          edit
        </button>
        <button
          onClick={() => {
            setDeleteToggle(!deleteToggle);
            setModalToggle(!modalToggle);
          }}>
          delete
        </button>
      </div>
    </>
  );
};

export default Menu;
