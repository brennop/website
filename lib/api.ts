import fs from 'fs'
import { join } from 'path'

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

export function getFolders(): string[] {
  return getFiles().filter(file => fs.lstatSync(join(filesDir, file)).isDirectory())
}

export function getFolderContent(folder: string): string[] {
  return fs.readdirSync(join(filesDir, folder))
}
