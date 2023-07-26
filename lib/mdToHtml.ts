import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";

import matter from "gray-matter";
import yaml from "js-yaml";

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
    .use(remarkRehype, { allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
