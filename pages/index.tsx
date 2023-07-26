import type { NextPage } from "next";
import Head from "next/head";
import Items from "../components/items";
import { getFiles } from "../lib/api";

export async function getStaticProps() {
  return {
    props: {
      files: getFiles(),
    },
  };
}

type Props = {
  files: string[];
};

const Home: NextPage<Props> = ({ files }) => {
  return (
    <>
      <Head>
        <title>brennim</title>
        <meta name="description" content="site do brennim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Items files={files} className="block" />
    </>
  );
};

export default Home;
