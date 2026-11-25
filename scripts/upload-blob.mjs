import fs from 'node:fs'
import path from 'node:path'

const ASSETS_ROOT = path.resolve(process.cwd(), 'src', 'assets')
const MANIFEST_PATH = path.resolve(process.cwd(), 'src', 'blobManifest.json')
const BLOB_PREFIX = 'anaaj-rice-industry'

const MIME_TYPES = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

function loadEnvToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN.trim()
  }
  for (const envFile of ['.env.local', '.env']) {
    const full = path.resolve(process.cwd(), envFile)
    if (!fs.existsSync(full)) continue
    const lines = fs.readFileSync(full, 'utf8').split(/\r?\n/)
    for (const line of lines) {
      const match = line.match(/^\s*BLOB_READ_WRITE_TOKEN\s*=\s*(.+?)\s*$/)
      if (match) {
        return match[1].replace(/^['"]|['"]$/g, '')
      }
    }
  }
  return ''
}

function collectAssets(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectAssets(full))
    } else {
      const ext = path.extname(entry.name).toLowerCase()
      if (MIME_TYPES[ext]) {
        results.push(full)
      }
    }
  }
  return results.sort()
}

async function main() {
  const token = loadEnvToken()
  if (!token) {
    console.error('Missing BLOB_READ_WRITE_TOKEN. Set it in your shell or .env.local before running this script.')
    process.exit(1)
  }

  let put
  try {
    ({ put } = await import('@vercel/blob'))
  } catch {
    console.error('Missing @vercel/blob package. Run: npm install -D @vercel/blob')
    process.exit(1)
  }

  const files = collectAssets(ASSETS_ROOT)
  const manifest = {}

  const { createHash } = await import('node:crypto')
  let existingManifest = {}
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      existingManifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    } catch {
      existingManifest = {}
    }
  }

  for (const filePath of files) {
    const relPath = path.relative(ASSETS_ROOT, filePath).replace(/\\/g, '/')
    const ext = path.extname(filePath).toLowerCase()
    const data = fs.readFileSync(filePath)
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 8)
    const parsed = path.posix.parse(relPath)
    const hashedName = `${parsed.name}-${hash}${ext}`
    const versionedRel = parsed.dir ? `${parsed.dir}/${hashedName}` : hashedName
    const pathname = `${BLOB_PREFIX}/${versionedRel}`
    const prevUrl = existingManifest[relPath]

    if (prevUrl && prevUrl.endsWith(`/${pathname}`)) {
      manifest[relPath] = prevUrl
      console.log(`Unchanged ${relPath} -> ${prevUrl}`)
      continue
    }

    const blob = await put(pathname, data, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 31536000,
      contentType: MIME_TYPES[ext],
      token,
    })

    manifest[relPath] = blob.url
    console.log(`Uploaded ${relPath} -> ${blob.url}`)
  }

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  console.log(`\nWrote ${Object.keys(manifest).length} Blob URLs to src/blobManifest.json`)
}

main().catch((err) => {
  console.error('Vercel Blob upload failed:', err)
  process.exit(1)
})
