import { getFiles } from "../../lib/api";
import Folder from "../../components/folder";

export async function getStaticProps() {
  return {
    props: {
      name: "tracks",
      files: getFiles(),
      content: getFiles("tracks"),
    },
  };
}

export default Folder;

