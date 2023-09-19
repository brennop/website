import { GetStaticProps } from "next";
import Head from "next/head";
import Items from "../../components/items";
import dynamic from "next/dynamic";

import Window from "../../components/window";
import { getFile, getFiles } from "../../lib/api";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const files = getFiles();

  const filename = params?.game as string;

  const file = getFile(filename, "games");
  const name = filename.replace(/\.exe/, "");

  const { url, width, height, component } = JSON.parse(file);

  return {
    props: {
      files: files,
      name: name,
      url: url ?? null,
      width: width ?? null,
      height: height ?? null,
      component: component ?? null,
    },
  };
};

export async function getStaticPaths() {
  const files = getFiles("games");

  return {
    paths: files.map((file) => {
      return {
        params: {
          game: file,
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
  url?: string;
  width?: number;
  height?: number;
  component?: string;
};

export default function Post({
  files,
  name,
  constraintsRef,
  url,
  width,
  height,
  component,
}: Props) {
  const Component = component ? dynamic(() => import(`../../components/games/${name}.tsx`)) : null;

  return (
    <>
      <Head>
        <title>{`${name} - brennim`}</title>
        <meta name="description" content="site do brennim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Items files={files} />

      <Window constraintsRef={constraintsRef} className="h-min">
        {Component && <Component />}
        {url && (
          <iframe
            width={width}
            height={height}
            src={url}
            frameBorder="0"
            allowFullScreen
          />
        )}
      </Window>
    </>
  );
}
