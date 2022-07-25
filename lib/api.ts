import fs from 'fs'
import { join } from 'path'

import mdToHtml, { parseFrontmatter } from "../lib/mdToHtml";

const filesDir = join(process.cwd(), 'files')

export function getFiles(): string[] {
  return fs.readdirSync(filesDir)
}

export function getMarkdownFiles(): string[] {
  return getFiles().filter(file => file.endsWith('.md'))
}

export function getFile(file: string): string {
  return fs.readFileSync(join(filesDir, file), 'utf8')
}

export async function getMarkdownProps(filename: string) {
  const file = getFile(filename);

  const { content, data } = parseFrontmatter(file);
  const html = await mdToHtml(content);

  return {
    type: 'markdown',
    html,
    data,
  }
}

export async function getEmbedProps(filename: string) {
  const file = getFile(filename);

  const { url, width, height } = JSON.parse(file);

  return {
    type: 'embed',
    url,
    width,
    height,
  }
}
