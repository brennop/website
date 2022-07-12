import { motion, useDragControls } from "framer-motion";
import Link from "next/link";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  className?: string;
  name?: string;
};

export default function Window({ constraintsRef, children, className }: Props) {
  const controls = useDragControls();

  return (
    <motion.div
      key="window"
      className={`absolute left-0 top-0 md:top-8 md:left-32 resize flex flex-col shadow-xl border-2 border-gray-900 ${className}`}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.1}
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
      <div className="bg-white overflow-y-auto flex-1">{children}</div>
    </motion.div>
  );
}
