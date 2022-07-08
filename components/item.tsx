import Link from "next/link";

type Props = {
  file: string;
}

function getEmoji(file: string) {
  if (file.endsWith(".md")) {
    return "📝";
  } else {
    return "📁";
  }
}

export default function Item({ file }: Props) {

  return (
    <Link href={`/[file]`} as={`/${file}`}>
      <a
        className="p-2 flex flex-col items-center w-20 select-none cursor-pointer"
      >
        <div className="text-3xl">{getEmoji(file)}</div>
        <span className="text-sm bg-white">{file}</span>
      </a>
    </Link>)
}
