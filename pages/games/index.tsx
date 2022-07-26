import { getFiles } from "../../lib/api";
import Folder from "../../components/folder";

export async function getStaticProps() {
  return {
    props: {
      name: "games",
      files: getFiles(),
      content: getFiles("games"),
    },
  };
}

export default Folder;
