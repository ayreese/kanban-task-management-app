import Head from "next/head";
import Image from "next/image";
import logoInBlack from "public/assets/logo-dark.svg";
import { useEffect, useState } from "react";
import BoardSelection from "@/components/board/BoardSelection";
import { hasCookie } from "cookies-next";
import Auth from "@/components/auth/Auth";
import { GET_BOARDS } from "@/graphql/query";
import { useQuery } from "@apollo/client";

export default function Home() {
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
    refetch: queryRefetch,
  } = useQuery(GET_BOARDS);

  const [isCookie, setIsCookie] = useState<boolean>(false);
  const [boardSelectToggle, setSelectToggle] = useState<boolean>(true);

  useEffect(() => {
    setIsCookie(hasCookie("auth"));
  }, [queryLoading]);

  useEffect(() => {
    setIsCookie(hasCookie("auth"));
  }, [hasCookie("auth")]);

  if (queryLoading) return <>Loading...</>;

  if (queryError) {
    const userNull = "Cannot read properties of null (reading 'userId')";
    if (queryError.message === userNull) {
      return (
        <>
          <Head>
            <title>kanban task management app</title>
            <meta
              name="description"
              content="The app that helps you get work done"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/public/assets/favicon-32x32.png" />
          </Head>
          <main className="container">
            {isCookie ? (
              <BoardSelection
                boards={queryData.userBoards}
                toggle={boardSelectToggle}
                setBoardSelectionToggle={setSelectToggle}
              />
            ) : (
              <>
                <Auth />
              </>
            )}
          </main>
        </>
      );
    } else return queryError.message;
  }
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
        {isCookie ? (
          <BoardSelection
            boards={queryData.userBoards}
            toggle={boardSelectToggle}
            setBoardSelectionToggle={setSelectToggle}
          />
        ) : (
          <>
            <Auth />
          </>
        )}
      </main>
    </>
  );
}
