import { join } from "path";
import { promises as fs } from 'fs';

import type { PageServerLoad } from "./$types";

const filesDir = join(process.cwd(), "files");

export const load: PageServerLoad = async ({ params }) => {
  const folder = await fs.readdir(join(filesDir, params.folder));

  const files = folder.map((file) => {
    return {
      name: file,
      path: join(params.folder, file),
    }
  });

  return { files };
}
