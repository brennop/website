import Link from "next/link";

function getEmoji(file: string) {
  const [_, extension] = file.split(".");

  if (file === "tracks") {
    return "🎵";
  }

  switch (extension) {
    case "md":
      return "📝";
    case "exe":
      return "💻";
    case "txt":
      return "📄";
    case "jpg":
      return "🖼️";
    case "mp3":
      return "🎵";
    default:
      return "📁";
  }
}

type Props = {
  file: string;
  base?: string;
  first?: boolean;
};

export default function Item({ file, base, first }: Props) {
  const emoji = getEmoji(file);

  const path = base ? `${base}/${file}` : file;

  return (
    <li>
      <Link href={`/${path}`}>
        <a className="relative p-2 flex flex-col items-center w-20 select-none cursor-pointer">
          <div className="text-3xl">{emoji}</div>
          <span className="text-sm bg-white">{file}</span>
          {first && (
            <span className="absolute top-0 right-0 animate-pulse">🆕</span>
          )}
        </a>
      </Link>
    </li>
  );
}
