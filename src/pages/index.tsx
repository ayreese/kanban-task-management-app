import Head from "next/head";
import Image from "next/image";
import logoInBlack from "public/assets/logo-dark.svg";
import logoInWhite from "public/assets/logo-light.svg";
import menu from "public/assets/icon-vertical-ellipsis.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>kanban task management app</title>
        <meta name="description" content="The app that helps you get work done" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/assets/favicon-32x32.png" />
      </Head>
      <main className={"container"}>
        <div className={"boardContainerGrid"}>
          <div className={"boardSelectionArea"}>
            <div className={"logoWrapper"}>
              <Image src={logoInBlack} alt="logo" />
            </div>
              <div className={"boardSelectionWrapper"}>
                  <p className={"allBoardsMdBody"}></p>
              </div>
          </div>
          <div className={"selectedBoardArea"}>
            <div className={"addNewTaskWrapper"}>
              <p className={"boardNameXl"}>
                board name
              </p>
              <div className={"newTaskWrapper"}>
                <button>add new task</button>
                <Image src={menu} alt="menu" />
              </div>
            </div>
              <div className={"boardColumnsWrapper"}>
                  <div><button> add new board</button></div>
              </div>
          </div>

        </div>
      </main>
    </>
  );
}
