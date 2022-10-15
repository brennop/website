import { join } from "path";
import { promises as fs } from 'fs';

const filesDir = join(process.cwd(), "files");

export const load = async () => {
  const files = await fs.readdir(filesDir);

  return { files };
}
