import { GetStaticProps } from "next";
import Head from "next/head";
import Items from "../../components/items";
import { getFiles } from "../../lib/api";
import Window from "../../components/window";
import { useEffect } from "react";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filename = params?.photo as string;

  const file = await import(`../../files/photos/${filename}`);

  const data = file.default;

  return {
    props: {
      file: data,
      filename: filename,
      files: getFiles(),
    },
  };
}

export async function getStaticPaths() {
  const files = getFiles("photos");

  return {
    paths: files.map((filename) => {
      return {
        params: {
          photo: filename,
        },
      };
    }),
    fallback: false,
  };
}

type Props = {
  file: any;
  files: string[];
  filename: string;
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Photo({ file, files, filename, constraintsRef }: Props) {
  useEffect(() => {
    import(`../../files/photos/${filename}`);
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
      >
        <img src={file.src} className="max-h-[512px]"/>
      </Window>
  </>
  );
}


