import { GetStaticProps } from "next";
import Head from "next/head";
import Items from "../../components/items";

import Window from "../../components/window";
import { getFile, getFiles } from "../../lib/api";
import mdToHtml, { parseFrontmatter } from "../../lib/mdToHtml";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();

  const filename = params?.post as string;

  const file = getFile(filename, "blog");
  const name = filename.replace(/\.md$/, "");

  const { content, data } = parseFrontmatter(file);
  const html = await mdToHtml(content);

  return {
    props: {
      files: files,
      name: name,
      content: html,
      data: data,
    },
  };
};

export async function getStaticPaths() {
  const files = getFiles("blog");

  return {
    paths: files.map((file) => {
      return {
        params: {
          post: file,
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
  data: {
    title: string;
    date: string;
  };
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Post({
  files,
  content,
  data,
  name,
  constraintsRef,
}: Props) {
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
        <div className="p-4">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-sm text-gray-700">{data.date}</p>
        </div>
        <section
          className="prose prose-h1:text-xl prose-h2:text-lg p-6 prose-p:text-justify max-w-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Window>
    </>
  );
}
