import { getFile, getFiles } from "../../lib/api";
import Folder from "../../components/folder";
import matter from "gray-matter";

export async function getStaticProps() {
  const content = getFiles("blog");

  const sorted = content.map(filename => {
    const file = getFile(filename, "blog");
    const { data } = matter(file);

    return ({ filename, data });
  }).sort((a, b) => {
    return b.data.date - a.data.date;
  }).map(({ filename }) => {
    return filename;
  })

  return {
    props: {
      name: "blog",
      files: getFiles(),
      content: sorted,
    },
  };
}

export default Folder;
