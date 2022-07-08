import { GetStaticProps } from "next";
import { useContext, useEffect } from "react";

import Main from "../components/main";
import { WindowsContext } from "../contexts/windows";
import { getFile, getFiles, getFolderContent } from "../lib/api";
import mdToHtml, { parseFrontmatter } from "../lib/mdToHtml";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();

  const file = params?.file as string;

  if (file.endsWith(".md")) {
    const fileContent = getFile(params?.file as string);

    const { content, data } = parseFrontmatter(fileContent);
    const html = await mdToHtml(content);

    return {
      props: {
        files: files,
        type: "markdown",
        content: html,
        data: data,
      },
    };
  } else {
    // must be a folder
    const folderContents = getFolderContent(file);

    return {
      props: {
        files: files,
        type: "folder",
        content: folderContents,
      },
    };
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

type Props =
  | {
    files: string[];
    type: "markdown";
    content: string;
    data: {
      title: string;
      date: string;
    };
  }
  | {
    files: string[];
    type: "folder";
    content: string[];
    data?: never;
  };

export default function File({ files, content, data, type }: Props) {
  const { setFolder, setPost } = useContext(WindowsContext);

  useEffect(() => {
    if (type === "folder") {
      setFolder?.(content);
    } else if (type === "markdown") {
      setPost?.({ title: data.title, date: data.date, content });
    }
  }, [type, content, setFolder]);

  return (
    <Main files={files}>
    </Main>
  );
}
