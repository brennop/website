import { GetStaticProps } from "next";
import Head from "next/head";
import EmbedWindow from "../components/embed";
import Items from "../components/items";
import MarkdownWindow from "../components/markdown";
import Window from "../components/window";

import { getFile, getFiles } from "../lib/api";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();
  const filename = params?.file as string;
  const [name, _] = filename.split(".");

  const content = getFile(filename);

  return {
    props: {
      content,
      name,
      files,
    },
  }
};

export async function getStaticPaths() {
  const files = getFiles();

  return {
    paths: files.map((file) => {
      return {
        params: {
          file: file,
        },
      };
    }),
    fallback: false,
  };
}

type Props = {
  files: string[];
  content: string;
  name: string;
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function File({ files, content, name, constraintsRef }: Props) {
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
        className="w-screen max-w-2xl h-full sm:h-5/6"
      >
        <pre className="p-2">{content}</pre>
      </Window>
    </>
  );
}
