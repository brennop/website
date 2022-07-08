import { GetStaticProps } from "next";
import { useRef } from "react";

import Main from "../components/main";
import Window from "../components/window";
import { getFile, getFiles, getMarkdownFiles } from "../lib/api";
import mdToHtml, { parseFrontmatter } from "../lib/mdToHtml";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();

  const file = getFile(params?.file as string);

  const { content, data } = parseFrontmatter(file);
  const html = await mdToHtml(content);

  return {
    props: {
      files: files,
      content: html,
      data: data,
    },
  };
}

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
  data: {
    title: string;
    date: string;
  }
};

export default function File({ files, content, data }: Props) {
  const constraintsRef = useRef(null);

  return (
    <Main files={files} ref={constraintsRef}>
      <Window
        constraintsRef={constraintsRef}
        className="w-screen max-w-2xl h-full sm:h-5/6">
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
  );
}
