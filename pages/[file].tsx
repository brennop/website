import { motion, useDragControls } from "framer-motion";
import { useRef } from "react";
import Main from "../components/main";
import { getFile, getFiles } from "../lib/api";

export async function getStaticProps({ params }) {
  const files = getFiles();
  const file = getFile(params.file);

  return {
    props: {
      files: files,
      content: file,
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
  content?: string;
};

export default function File({ files, content }: Props) {
  const controls = useDragControls();
  const constraintsRef = useRef(null);

  return (
    <Main files={files} ref={constraintsRef}>
      <motion.div
        className="absolute left-32 w-screen max-w-2xl h-4/6 resize flex flex-col"
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={constraintsRef}
      >
        <div
          className="p-2 bg-white border-b-2 border-gray-700"
          onPointerDown={(event) => controls.start(event)}
        >
        </div>
        <div className="bg-white overflow-y-auto flex-1 p-4">
          {content}
        </div>
      </motion.div>
    </Main>
  );
}
