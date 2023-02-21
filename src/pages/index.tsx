import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/modules/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>kanban task management app</title>
        <meta name="description" content="The app that helps you get work done" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/assets/favicon-32x32.png" />
      </Head>
      <main className={styles.container}>
        <div className={styles.board}>

        </div>
      </main>
    </>
  );
}
