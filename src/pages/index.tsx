import Head from "next/head";
import {useEffect, useState} from "react";
import BoardSelection from "@/components/board/BoardSelection";
import {deleteCookie, hasCookie} from "cookies-next";
import Auth from "@/components/auth/Auth";
import {GET_BOARDS} from "@/graphql/query";
import {useQuery} from "@apollo/client";

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
        const isAuth = hasCookie("auth");
        setIsCookie(isAuth);
    }, [hasCookie("auth")]);

    // An expired or otherwise rejected token: drop it and show the login form.
    const isUnauthenticated = queryError?.graphQLErrors?.some(
        (e) => e.extensions?.code === "UNAUTHENTICATED"
    );
    useEffect(() => {
        if (isUnauthenticated && hasCookie("auth")) {
            deleteCookie("auth", {path: "/"});
            setIsCookie(false);
        }
    }, [isUnauthenticated]);

    if (queryLoading) return <>Loading...</>;
    if (queryError && !isUnauthenticated) console.log("We got this error", queryError);

    return (
        <>
            <Head>
                <title>kanban task management app</title>
                <meta
                    name="description"
                    content="The app that helps you get work done"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/public/assets/favicon-32x32.png"/>
            </Head>
            <main className="container">
                {isCookie && queryData ? (
                    <BoardSelection
                        boards={queryData.userBoards}
                        toggle={{state: boardSelectToggle, setState: setSelectToggle}}
                    />
                ) : (
                    <>
                        <Auth/>
                    </>
                )}
            </main>
        </>
    );
}
