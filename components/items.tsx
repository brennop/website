import Item from "./item";

export default function Items({ files }: { files: string[] }) {
  return (
    <>
      {files.map((file) => (
        <Item key={file} file={file} />
      ))}
    </>
  );
}
