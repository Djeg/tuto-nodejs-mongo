import { build } from './app.js'
import dotenv from 'dotenv'

// Nous lisons le fichier .env
dotenv.config()

const start = async () => {
  const app = await build()

  // On démarre l'application
  await app.listen(process.env.PORT, process.env.HOST)
}

start()
