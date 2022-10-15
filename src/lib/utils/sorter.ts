import { promises as fs } from 'fs';
import { join } from "path";
import matter from "gray-matter";

const filesDir = join(process.cwd(), "files");

export async function sortFiles(files: string[], folder: string) {
  const transformed: ({
    name: string;
    type: "folder" | "file";
  } | {
    name: string;
    type: "md";
    data: Record<string, any>;
  })[] = await Promise.all(files.map(async (file) => {
      if (file.endsWith(".md")) {
        const content = await fs.readFile(join(filesDir, folder, file), "utf-8");
        const { data } = matter(content);
        return {
          name: file,
          data,
          type: "md",
        };
      }

      if (file.includes(".")) {
        return {
          name: file,
          type: "file",
        }
      }

      return {
        name: file,
        type: "folder",
      };
    })
  );

  const sorted = transformed.sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1;
    if (a.type !== "folder" && b.type === "folder") return 1;
    if (a.type === "md" && b.type === "md") return a.data.date - b.data.date;
    return a.name.localeCompare(b.name);
  })

  return sorted;
}
