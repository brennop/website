import { motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useMemo } from "react";
import { WindowsContext, WindowType } from "../contexts/windows";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement>;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  type: WindowType;
};

export default function Window({
  constraintsRef,
  children,
  className = "",
  onClose,
  type,
}: Props) {
  const controls = useDragControls();

  const { zStack, sendToTop } = useContext(WindowsContext);

  useEffect(() => {
    sendToTop(type);
  } , [sendToTop, type]);

  const zIndex = useMemo(() => {
    const index = zStack.indexOf(type);
    return index === -1 ? 0 : "z-" + (index + 1) * 10;
  }, [zStack, type]);

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    sendToTop(type);

    controls.start(event);
  }

  return (
    <motion.div
      className={`absolute left-0 top-0 md:top-8 md:left-32 resize flex flex-col shadow-xl border-2 border-gray-900 ${className} ${zIndex}`}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
    >
      <div
        className="p-1 bg-gray-900 border-b-2 border-gray-900 flex justify-end"
        onPointerDown={handleDrag}
      >
        <Link href="/">
          <a
            className="relative w-4 h-4 bg-cyan-100 text-gray-900 grid place-items-center"
            onClick={onClose}
          >
            <span className="leading-[0]">×</span>
          </a>
        </Link>
      </div>
      <div className="bg-white overflow-y-auto flex-1">{children}</div>
    </motion.div>
  );
}
