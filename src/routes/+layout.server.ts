import { join } from "path";
import { promises as fs } from 'fs';
import { sortFiles } from "$lib/utils/sorter";

const filesDir = join(process.cwd(), "files");

export const load = async () => {
  const folder = await fs.readdir(join(filesDir));
  
  const sorted = await sortFiles(folder, "");

  const files = sorted.map((file) => {
    return {
      name: file.name,
      path: join("/", file.name),
    }
  });

  return { files };
}

export const prerender = true;
