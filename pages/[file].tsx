import { useRef } from "react";

import Main from "../components/main";
import Window from "../components/window";
import { getFile, getFiles, getMarkdownFiles } from "../lib/api";
import mdToHtml from "../lib/mdToHtml";

export async function getStaticProps({ params }) {
  const files = getFiles();
  const file = getFile(params.file);

  const content = await mdToHtml(file);

  return {
    props: {
      files: files,
      content: content,
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
};

export default function File({ files, content }: Props) {
  const constraintsRef = useRef(null);

  return (
    <Main files={files} ref={constraintsRef}>
      <Window
        constraintsRef={constraintsRef}
        className="w-screen max-w-2xl h-full sm:h-5/6">
        <div
          className="prose prose-h1:text-2xl p-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Window>
    </Main>
  );
}
