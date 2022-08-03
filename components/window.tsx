import { motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  className?: string;
};

export default function Window({ constraintsRef, children, className }: Props) {
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const back = router.pathname.split("/").at(-2);

  useEffect(() => ref.current?.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <motion.div
      className={`absolute left-0 top-0 md:top-8 md:left-32 resize flex flex-col shadow-xl border-2 border-gray-900 ${className}`}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.15 }}
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
