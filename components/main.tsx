import { forwardRef } from "react";

type Props = {
  children?: React.ReactNode;
};

export default forwardRef<HTMLDivElement, Props>(function Main(
  { children },
  ref
) {
  return (
    <main className="h-screen w-screen flex flex-col font-sans overflow-hidden">
      <nav className="h-10 p-2 bg-white border-b-2 border-gray-900 flex justify-between">
        <div className="flex items-center">
          <img src="/desktop.gif" className="w-5 h-5 mr-2" />
          <div className="relative">
            <img src="/sparks.gif" className="absolute w-full h-full" />
            <span className="shadow-sky-300 text-shadow-lg text-sky-500/80 bg-clip-text bg-bottom bg-[url('/glitter.gif')]">
              brennim
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span>17:38</span>
        </div>
      </nav>

      <div
        className="relative bg-cyan-100 flex-1 h-0 sm:p-2 flex gap-2"
        ref={ref}
      >
        {children}
      </div>
    </main>
  );
});
