import { getFiles } from "../../lib/api";
import Folder from "../../components/folder";

export async function getStaticProps() {
  return {
    props: {
      name: "photos",
      files: getFiles(),
      content: getFiles("photos"),
    },
  };
}

export default Folder;

