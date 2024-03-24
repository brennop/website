import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Items from "../../components/items";

import Window from "../../components/window";
import { getFile, getFiles } from "../../lib/api";
import mdToHtml, { parseFrontmatter } from "../../lib/mdToHtml";

export const getStaticProps: GetStaticProps = async ({ params, locale, defaultLocale }) => {
  const files = getFiles();

  const filename = params?.post as string;
  const name = filename.replace(/\.md$/, "");

  let file = "";

  if (locale !== defaultLocale) {
    file = getFile(filename, `en/blog`);
  }

  if (file == "") {
    file = getFile(filename, "blog");
  }

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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const files = getFiles("blog");

  if (!locales) {
    throw new Error("locales not defined");
  }

  return {
    paths: files.map((file) => {
      return locales.map((locale) => {
        return {
          params: {
            post: file,
          },
          locale: locale,
        };
      });
    }).flat(),
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
        className="sm:h-5/6 font-sans"
      >
        <div className="p-8 pb-0 max-w-md">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-sm text-gray-700">{data.date}</p>
        </div>
        <section
          className="prose prose-h1:text-xl prose-h2:text-lg p-8 prose-p:text-justify"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Window>
    </>
  );
}
