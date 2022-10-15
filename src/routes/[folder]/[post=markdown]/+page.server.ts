import { join } from "path";
import { promises as fs } from 'fs';

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";

import matter from "gray-matter";
import yaml from "js-yaml";

import type { PageServerLoad } from "./$types";

export function parseFrontmatter(markdown: string) {
  return matter(markdown, {
    engines: {
      yaml: (s) =>
        yaml.load(s, { schema: yaml.JSON_SCHEMA }) as (s: string) => any,
    },
  });
}

export default async function mdToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

const filesDir = join(process.cwd(), "files");

export const load: PageServerLoad = async ({ params }) => {
  const file = await fs.readFile(join(filesDir, params.folder, params.post), "utf-8");

  const { post, folder } = params;

  const name = post.replace(/\.md$/, "");

  const { content, data } = parseFrontmatter(file);
  const html = await mdToHtml(content);

  return {
    folder,
    html,
    data,
    name,
  };
}
