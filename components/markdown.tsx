import Window from "../components/window";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
  html: string;
  data: {
    title: string;
    date: string;
  };
}


export default function MarkdownWindow({ constraintsRef, data, html }: Props) {
  return <Window
    constraintsRef={constraintsRef}
    className="w-screen max-w-2xl h-full sm:h-5/6"
  >
    <div className="p-4">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-sm text-gray-700">{data.date}</p>
    </div>
    <section
      className="prose prose-h1:text-xl prose-h2:text-lg p-6 prose-p:text-justify"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </Window>
}
