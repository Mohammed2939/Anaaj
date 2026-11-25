import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ASSETS_DIR = path.resolve(process.cwd(), 'src', 'assets')
const MANIFEST_PATH = path.resolve(process.cwd(), 'src', 'blobManifest.json')
const BLOB_VIRTUAL_PREFIX = '\0vercel-blob:'
const MEDIA_EXTS = new Set(['.mp4', '.webm', '.mov', '.jpg', '.jpeg', '.png', '.webp', '.svg'])

/**
 * Resolves src/assets/* media imports directly to Vercel Blob URLs when present in
 * src/blobManifest.json (or via VITE_BLOB_BASE_URL), skipping binary bundling
 * into dist/ while falling back transparently to local optimized files.
 */
function vercelBlobAssetsPlugin() {
  let manifest = {}
  const urlMap = new Map()
  const baseUrl = (process.env.VITE_BLOB_BASE_URL || '').replace(/\/+$/, '')

  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    } catch {
      manifest = {}
    }
  }

  return {
    name: 'vercel-blob-assets',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer || !source.includes('assets/')) return null
      const cleanSource = source.split('?')[0]
      if (!MEDIA_EXTS.has(path.extname(cleanSource).toLowerCase())) return null
      const absTarget = cleanSource.startsWith('/src/')
        ? path.resolve(process.cwd(), cleanSource.slice(1))
        : path.resolve(path.dirname(importer), cleanSource)
      if (!absTarget.startsWith(ASSETS_DIR + path.sep)) return null

      const relPath = path.relative(ASSETS_DIR, absTarget).replace(/\\/g, '/')
      const resolvedUrl = manifest[relPath] || (baseUrl ? `${baseUrl}/anaaj-rice-industry/${relPath}` : '')
      if (!resolvedUrl) return null

      // Store URL in map instead of the module ID so Vite never collapses 'https://' into 'https:/'
      const virtualId = `${BLOB_VIRTUAL_PREFIX}${relPath}`
      urlMap.set(virtualId, resolvedUrl)
      return virtualId
    },
    load(id) {
      if (!id.startsWith(BLOB_VIRTUAL_PREFIX)) return null
      const blobUrl = urlMap.get(id)
      if (!blobUrl) return null
      return `export default ${JSON.stringify(blobUrl)};`
    },
  }
}

export default defineConfig({
  plugins: [vercelBlobAssetsPlugin(), react()],
  assetsInclude: ['**/*.mov', '**/*.mp4', '**/*.webm'],
  server: {
    host: true, // exposes on all local network interfaces (0.0.0.0)
  },
})
