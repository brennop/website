import Item from "./item";

type Props = {
  files: string[];
  base?: string;
} & React.HTMLAttributes<HTMLUListElement>;

export default function Items({ files, base, ...props }: Props) {
  return (
    <ul {...props}>
      {files.map((file) => (
        <Item key={file} file={file} base={base} />
      ))}
    </ul>
  );
}
