import Link from "next/link";

function getEmoji(file: string) {
  const [_, extension] = file.split(".");

  switch (extension) {
    case "md":
      return "📝";
    case "exe":
      return "💻";
    case "txt":
      return "📄";
    default:
      return "📁";
  }
}

type Props = {
  file: string;
  base?: string;
};

export default function Item({ file, base }: Props) {
  const emoji = getEmoji(file);

  const path = base ? `${base}/${file}` : file;

  return (
    <li>
      <Link href={`/${path}`}>
        <a className="p-2 flex flex-col items-center w-20 select-none cursor-pointer">
          <div className="text-3xl">{emoji}</div>
          <span className="text-sm bg-white">{file}</span>
        </a>
      </Link>
    </li>
  );
}
