import { GetStaticProps } from "next";
import Head from "next/head";
import Items from "../../components/items";
import { getFile, getFiles } from "../../lib/api";
import Window from "../../components/window";
import { useEffect, useRef } from "react";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filename = params?.track as string;

  const file = getFile(filename, "tracks");
  console.log(file);

  const url = `https://tracks.brennn.in/${file}`;

  return {
    props: {
      url: url,
      filename: filename,
      files: getFiles(),
      content: getFiles("tracks"),
    },
  };
}

export async function getStaticPaths() {
  const files = getFiles("tracks");

  return {
    paths: files.map((filename) => {
      return {
        params: {
          track: filename,
        },
      };
    }),
    fallback: false,
  };
}

type Props = {
  url: string;
  files: string[];
  filename: string;
  content: string[];
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Track({ url, files, filename, content, constraintsRef }: Props) {
  const webampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadWebamp() {
      if (typeof window !== 'undefined' && webampRef.current) {
        const { default: Webamp } = await import('webamp');

        const webamp = new Webamp({
          initialTracks: [
            {
              metaData: {
                artist: "brennim",
                title: filename,
              },
              url: url,
            },
          ],
        });

        webamp.renderWhenReady(webampRef.current);
      }
    }

    loadWebamp();
  }, [filename]);

  return (
    <>
      <Head>
        <title>{`${filename} - brennim`}</title>
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
          base="tracks"
          files={content}
        />
      </Window>

      <div ref={webampRef} />
    </>
  );
}


