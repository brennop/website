import { useContext, useRef } from "react";
import { WindowsContext } from "../contexts/windows";
import Item from "./item";
import Window from "./window";

type Props = {
  files: string[];
  children?: React.ReactNode;
};

export default function Main(
  { files }: Props,
) {
  const constraintsRef = useRef(null!);

  const { setFolder, folder, post, setPost } = useContext(WindowsContext);

  return (
    <main className="h-screen w-screen flex flex-col font-serif overflow-hidden">

      <nav className="h-10 p-2 bg-white border-b-2 border-gray-900 flex justify-between">
        <div className="flex items-center">
          <span className="shadow-purple-200 text-shadow text-purple-500/70 bg-clip-text bg-bottom bg-[url('/glitter.gif')]">
            brennim
          </span>
        </div>
        <div className="flex items-center">
          <span>17:38</span>
        </div>
      </nav>

      <div
        className="relative bg-cyan-100 flex-1 p-2 flex flex-col flex-wrap items-start"
        ref={constraintsRef}
      >
        {files.map((file) => (
          <Item key={file} file={file} />
        ))}
        {post && (
          <Window
            type="markdown"
            constraintsRef={constraintsRef}
            className="w-screen max-w-2xl h-full sm:h-5/6"
            onClose={() => setPost?.(undefined)}
          >
            <div className="p-4">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="text-sm text-gray-700">{post.date}</p>
            </div>
            <section
              className="prose prose-h1:text-xl prose-h2:text-lg p-6 prose-p:text-justify"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Window>
        )}
        {folder && (
          <Window
            type="folder"
            constraintsRef={constraintsRef}
            className="w-screen max-w-2xl h-full sm:h-5/6"
            onClose={() => setFolder?.(undefined)}
          >
            <div>
              {folder.map((file) => (
                <div key={file}>{file}</div>
              ))}
            </div>
          </Window>
        )}
      </div>
    </main>
  );
};
