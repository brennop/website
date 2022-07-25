import Window from "../components/window";

type Props = {
  constraintsRef: React.MutableRefObject<HTMLDivElement | null>;
  url: string;
  width?: number;
  height?: number;
};

export default function EmbedWindow({
  constraintsRef,
  url,
  width = 800,
  height = 600,
}: Props) {
  return (
    <Window constraintsRef={constraintsRef} className="">
      <iframe
        width={width}
        height={height}
        src={url}
        frameBorder="0"
        allowFullScreen
      />
    </Window>
  );
}
