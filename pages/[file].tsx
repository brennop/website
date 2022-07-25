import { GetStaticProps } from "next";
import Head from "next/head";
import EmbedWindow from "../components/embed";
import Items from "../components/items";
import MarkdownWindow from "../components/markdown";

import { getEmbedProps,  getFiles, getMarkdownProps } from "../lib/api";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();
  const filename = params?.file as string;
  const [name, extension] = filename.split(".");

  switch (extension) {
    case "md": {
      const {type, ...props} = await getMarkdownProps(filename);

      return {
        props: {
          type,
          props,
          name,
          files,
        },
      };
    }
    case "exe": {
      const {type, ...props} = await getEmbedProps(filename);

      return {
        props: {
          type,
          props,
          name,
          files,
        },
      }
    }
    default: return { props: { type: "unknown", files } }
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
  name: string;
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
} & ({
  type: "markdown";
  props: {
    html: string;
    data: {
      title: string;
      date: string;
    };
  }
} | {
  type: "embed";
  props: {
    url: string;
  }
});

export default function File({ type, files, name, constraintsRef, props }: Props) {
  return (
    <>
      <Head>
        <title>{`${name} - brennim`}</title>
        <meta name="description" content="site do brennim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Items files={files} />

      {type === "markdown" && (
        <MarkdownWindow constraintsRef={constraintsRef} {...props} />
      )}
      {type === "embed" && (
        <EmbedWindow constraintsRef={constraintsRef} {...props} />
      )}
    </>
  );
}
