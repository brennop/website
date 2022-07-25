import Link from "next/link";

type Props = {
  file: string;
}

export default function Item({ file }: Props) {
  const [_, extension] = file.split(".");

  switch (extension) {
    case "md":
      return (
        <Link href={`/[file]`} as={`/${file}`}>
          <a
            className="p-2 flex flex-col items-center w-20 select-none cursor-pointer"
          >
            <div className="text-3xl">📝</div>
            <span className="text-sm bg-white">{file}</span>
          </a>
        </Link>)
    case "exe":
      return (
        <Link href={`/[file]`} as={`/${file}`}>
          <a
            className="p-2 flex flex-col items-center w-20 select-none cursor-pointer"
          >
            <div className="text-3xl">💻</div>
            <span className="text-sm bg-white">{file}</span>
          </a>
        </Link>)
    default: return null
  }
}
