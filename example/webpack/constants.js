const path = require('path')
const appRootPath = require('app-root-path')

const ROOT_DIR = appRootPath.toString()
const SRC_DIR = path.resolve(ROOT_DIR, 'example/src')
const DIST_DIR = path.resolve(ROOT_DIR, 'example/dist')
const ENTRY = './example/src/index.tsx'

module.exports = {
  ROOT_DIR,
  SRC_DIR,
  DIST_DIR,
  ENTRY,
}
