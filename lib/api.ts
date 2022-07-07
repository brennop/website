import fs from 'fs'
import { join } from 'path'

const filesDir = join(process.cwd(), 'files')

export function getFiles(): string[] {
  return fs.readdirSync(filesDir)
}

