import Item from "./item";

type Props = {
  files: string[];
  base?: string;
} & React.HTMLAttributes<HTMLUListElement>;

export default function Items({ files, base, ...props }: Props) {
  return (
    <ul className="hidden sm:block" {...props}>
      {files.map((file, index) => (
        <Item key={file} file={file} base={base} first={index === 0 && base === "blog"} />
      ))}
    </ul>
  );
}
