import fs from 'fs/promises'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

async function start() {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const envFilePath = `${__dirname}/../.env`
  const envDistFilePath = `${__dirname}/../.env.dist`

  try {
    await fs.access(envFilePath)

    return
  } catch (e) {
    await fs.copyFile(envDistFilePath, envFilePath)
  }
}

start()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)

    process.exit(1)
  })
