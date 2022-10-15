import { join } from "path";
import { promises as fs } from 'fs';
import { sortFiles } from "$lib/utils/sorter";

import type { LayoutServerLoad } from "./$types";

const filesDir = join(process.cwd(), "files");

export const load: LayoutServerLoad = async ({ params }) => {
  const folder = await fs.readdir(join(filesDir, params.folder));
  
  const sorted = await sortFiles(folder, params.folder);

  const files = sorted.map((file) => {
    return {
      name: file.name,
      path: join("/", params.folder, file.name),
    }
  });

  return { files };
}
