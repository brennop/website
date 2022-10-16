import { join } from "path";
import { promises as fs } from 'fs';

import type { PageServerLoad } from "./$types";

const filesDir = join(process.cwd(), "files");

export const load: PageServerLoad = async ({ params }) => {
  const { game, folder } = params;

  const file = await fs.readFile(join(filesDir, folder, game), "utf-8");

  const name = game.replace(/\.exe/, "");

  const { url, width, height } = JSON.parse(file);

  return {
    folder,
    name,
    url,
    width,
    height,
  };
}
