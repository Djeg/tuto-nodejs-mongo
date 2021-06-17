#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// Si le fichier `.env` n'éxiste pas
if (!fs.existsSync(`${__dirname}/../.env`)) {
  // Nous copions/collons le fichier `.env.dist` dans `.env`
  fs.copyFileSync(`${__dirname}/../.env.dist`, `${__dirname}/../.env`)
}
