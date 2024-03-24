import fs from "fs";
import { join } from "path";

const filesDir = join(process.cwd(), "files");

export function getFiles(path: string = ""): string[] {
  return fs.readdirSync(join(filesDir, path)).sort((a, b) => {
    const aIsFile = a.includes(".");
    const bIsFile = b.includes(".");

    if (aIsFile && !bIsFile) {
      return 1;
    } else if (!aIsFile && bIsFile) {
      return -1;
    } else {
      return a.localeCompare(b);
    }
  });
}

export function getMarkdownFiles(): string[] {
  return getFiles().filter((file) => file.endsWith(".md"));
}

export function getFile(file: string, path: string = ""): string {
  try {
    return fs.readFileSync(join(filesDir, path, file), "utf8");
  } catch (error) {
    return "";
  }
}
