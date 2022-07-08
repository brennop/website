import Link from "next/link";

type Props = {
  name: string;
}

export default function Item({ name }: Props) {
  return <Link href={`/${name}`}>
    <a
      className="p-2 flex flex-col items-center w-20 select-none cursor-pointer"
    >
      <div className="text-3xl">📝</div>
      <span className="text-sm bg-white">{name}</span>
    </a>
  </Link>;
}
