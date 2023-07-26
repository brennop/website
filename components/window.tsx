import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  className?: string;
};

export default function Window({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const back = router.pathname.split("/").at(-2);

  useEffect(() => ref.current?.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <div
      className={`resize flex flex-col shadow-xl border-2 border-gray-900 ${className}`}
    >
      <div
        className="p-1 bg-gray-900 border-b-2 border-gray-900 flex justify-end"
      >
        <Link href={`/${back}`}>
          <a className="relative w-4 h-4 bg-cyan-100 text-gray-900 grid place-items-center">
            <span className="leading-[0]">×</span>
          </a>
        </Link>
      </div>
      <div className="bg-white overflow-y-auto flex-1" ref={ref}>{children}</div>
    </div>
  );
}
