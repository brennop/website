import { getFiles } from "../../lib/api";
import Folder from "../../components/folder";

export async function getStaticProps() {
  return {
    props: {
      name: "blog",
      files: getFiles(),
      content: getFiles("blog"),
    },
  };
}

export default Folder;
