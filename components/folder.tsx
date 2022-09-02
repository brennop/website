import type { NextPage } from "next";
import Head from "next/head";
import Items from "./items";
import Window from "./window";

type Props = {
  name: string;
  files: string[];
  content: string[];
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
};

const Folder: NextPage<Props> = ({ name, files, content, constraintsRef }) => {
  return (
    <>
      <Head>
        <title>{`${name} - brennim`}</title>
        <meta name="description" content="site do brennim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Items files={files} />

      <Window
        constraintsRef={constraintsRef}
        className="w-screen max-w-2xl h-full sm:h-96"
      >
        <Items
          className="grid sm:grid-cols-5 grid-cols-3 place-items-center gap-4 p-2"
          base={name}
          files={content}
        />
      </Window>
    </>
  );
};

export default Folder;
