import { motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Main from "../components/main";
import { getFile, getFiles } from "../lib/api";
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

type Props = {
  files: string[];
  content: string;
};

export default function File({ files, content }: Props) {
  const controls = useDragControls();
  const constraintsRef = useRef(null);

  return (
    <Main files={files} ref={constraintsRef}>
      <motion.div
        className="absolute left-0 top-0 md:top-8 md:left-32 w-screen max-w-2xl h-full sm:h-5/6 resize flex flex-col shadow-xl border-2 border-gray-900"
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
      >
        <div
          className="p-1 bg-gray-900 border-b-2 border-gray-900 flex justify-end"
          onPointerDown={(event) => controls.start(event)}
        >
          <Link href="/">
            <a className="relative w-4 h-4 bg-cyan-100 text-gray-900 grid place-items-center">
              <span className="leading-[0]">×</span>
            </a>
          </Link>
        </div>
        <div className="bg-white overflow-y-auto flex-1 p-4">
          <div
            className="prose prose-h1:text-2xl p-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </motion.div>
    </Main>
  );
}
