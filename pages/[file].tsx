import { GetStaticProps } from "next";
import Head from "next/head";
import { useRef } from "react";

import Main from "../components/main";
import Window from "../components/window";
import { getFile, getFiles, getMarkdownFiles } from "../lib/api";
import mdToHtml, { parseFrontmatter } from "../lib/mdToHtml";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();

  const filename = params?.file as string;

  const file = getFile(filename);
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
  const files = getMarkdownFiles();

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
  data: {
    title: string;
    date: string;
  };
};

export default function File({ files, content, data, name }: Props) {
  const constraintsRef = useRef(null);

  return (
    <>
      <Head>
        <title>brennim - {name}</title>
        <meta name="description" content="site do brennim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main files={files} ref={constraintsRef}>
        <Window
          constraintsRef={constraintsRef}
          className="w-screen max-w-2xl h-full sm:h-5/6"
        >
          <div className="p-4">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-sm text-gray-700">{data.date}</p>
          </div>
          <section
            className="prose prose-h1:text-xl prose-h2:text-lg p-6 prose-p:text-justify"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Window>
      </Main>
    </>
  );
}
