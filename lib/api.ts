import fs from "fs";
import { join } from "path";

const filesDir = join(process.cwd(), "files");

export function getFiles(path: string = ""): string[] {
  return fs.readdirSync(join(filesDir, path));
}

export function getMarkdownFiles(): string[] {
  return getFiles().filter((file) => file.endsWith(".md"));
}

export function getFile(file: string, path: string = ""): string {
  return fs.readFileSync(join(filesDir, path, file), "utf8");
}
