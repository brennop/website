import { createContext, Dispatch, SetStateAction, useCallback, useState } from "react";

type Post = {
  title: string;
  date: string;
  content: string;
}

export type WindowType = "markdown" | "folder";

export const WindowsContext = createContext<{
  post?: Post;
  setPost?: (post?: Post) => void;
  image?: string;
  setImage?: (image?: string) => void;
  folder?: string[];
  setFolder?: (folder?: string[]) => void;
  zStack: WindowType[];
  sendToTop: (type: WindowType) => void;
}>({
  zStack: [],
  sendToTop: () => undefined,
})

export default function WindowsProvider({ children }: { children: React.ReactNode }) {
  const [post, setPost] = useState<Post>();
  const [image, setImage] = useState<string>();
  const [folder, setFolder] = useState<string[]>();
  const [zStack, setZStack] = useState<WindowType[]>([]);

  const sendToTop = useCallback((type: WindowType) => {
    setZStack((zStack) => [...zStack.filter((t) => t !== type), type]);
  }, [setZStack]);

  return (
    <WindowsContext.Provider
      value={{
        post,
        setPost,
        image,
        setImage,
        folder,
        setFolder,
        zStack,
        sendToTop,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}

