import Head from "next/head";
import Image from "next/image";
import logoInBlack from "public/assets/logo-dark.svg";
import boards from "../db/table.json";
import { useState } from "react";
import BoardSelection from "@/components/BoardSelection";
import SelectedBoard from "@/components/SelectedBoard";

export default function Home() {
  const [currentBoardIndex, setCurrentBoardIndex] = useState<number>(0);
  const [totalBoards, setTotalBoards] = useState(boards.length);
  const [boardSelectionToggle, setBoardSelectionToggle] = useState(true);

  return (
    <>
      <Head>
        <title>kanban task management app</title>
        <meta
          name="description"
          content="The app that helps you get work done"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/assets/favicon-32x32.png" />
      </Head>
      <main className="container">
        <div className="boardContainerGrid">
          <div className="logoArea">
            <Image src={logoInBlack} alt="logo" />
          </div>
          <BoardSelection
            toggle={boardSelectionToggle}
            boards={boards}
            index={currentBoardIndex}
            getBoard={setCurrentBoardIndex}
            setBoard={setBoardSelectionToggle}
          />
          <SelectedBoard
            boards={boards}
            index={currentBoardIndex}
            total={totalBoards}
            toggle={boardSelectionToggle}
          />
        </div>
      </main>
    </>
  );
}
