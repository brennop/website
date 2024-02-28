import { GetServerSideProps } from "next";
import Head from "next/head";
import Items from "../../components/items";
import { getFiles } from "../../lib/api";

import { useEffect, useRef } from "react";

const BUCKET_URL = "https://tracks.brennn.in";

const tracks = [
  "noclip-radio-ep1.mp3",
]

const initialTracks = tracks.map((track) => {
  return {
    metaData: {
      artist: "brennim",
      title: track,
    },
    url: `${BUCKET_URL}/${track}`,
  };
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const track = params?.track as string;

  return {
    props: {
      // as it's a catch-all route, track is an array
      track: track ? track[0] : null,
      files: getFiles(),
    },
  };
}

type Props = {
  track: string;
  files: string[];
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function Track({ track, files, }: Props) {
  const webampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (document.querySelector('#webamp') !== null) {
      return;
    }

    async function loadWebamp() {
      if (typeof window !== 'undefined' && webampRef.current) {
        const { default: Webamp } = await import('webamp');

        const initialTrack = initialTracks.find(({ metaData }) => metaData.title === track);

        console.log('initialTrack', initialTrack, track);

        const webamp = new Webamp({
          // we can't set the initial track to the url track, but we can set it to the first track
          initialTracks: initialTrack ? [initialTrack, ...initialTracks] : initialTracks,
        });

        webamp.renderWhenReady(webampRef.current);
      }
    }

    loadWebamp();
  }, [track]);

  return (
    <>
      <Head>
        <title>{`${track} - brennim`}</title>
        <meta name="description" content="site do brennim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Items files={files} />

      <div ref={webampRef} />
    </>
  );
}


