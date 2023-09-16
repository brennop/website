import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  className?: string;
};

export default function Window({ constraintsRef, children, className }: Props) {
  /**
    * This is a hack to garantee that the dragConstraints are set after the
    * animation is complete. Otherwise, contraints will be calculated with inital scale
    * and the window will be draggable outside the screen.
    */
  const [dragConstraints, setDragConstraints] = useState<React.MutableRefObject<HTMLDivElement | null>>();

  const controls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const back = router.pathname.split("/").at(-2);

  useEffect(() => ref.current?.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <motion.div
      className={`resize sm:mt-4 flex flex-col shadow-xl border-2 border-gray-900 ${className}`}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.07 }}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={dragConstraints}
      onAnimationComplete={() => setDragConstraints(constraintsRef)}
    >
      <div
        className="p-1 bg-gray-900 border-b-2 border-gray-900 flex justify-end"
        onPointerDown={(event) => controls.start(event)}
      >
        <Link href={`/${back}`}>
          <a className="relative w-4 h-4 bg-cyan-100 text-gray-900 grid place-items-center">
            <span className="leading-[0]">×</span>
          </a>
        </Link>
      </div>
      <div className="bg-white overflow-y-auto flex-1" ref={ref}>{children}</div>
    </motion.div>
  );
}
