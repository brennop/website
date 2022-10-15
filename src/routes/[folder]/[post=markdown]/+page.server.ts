import { join } from "path";
import { promises as fs } from 'fs';

import type { PageServerLoad } from "./$types";

const filesDir = join(process.cwd(), "files");

export const load: PageServerLoad = async ({ params }) => {
  const file = await fs.readFile(join(filesDir, params.folder, params.post), "utf-8");

  return { file, folder: params.folder };
}
