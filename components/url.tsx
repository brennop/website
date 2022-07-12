type Props = { href: string; name: string };

export default function Url({ href, name }: Props) {
  return <a
    href={href}
    className="p-2 flex flex-col items-center w-20 select-none cursor-pointer"
  >
    <div className="text-3xl">🌐</div>
    <span className="text-sm bg-white">{name}</span>
  </a>
}
