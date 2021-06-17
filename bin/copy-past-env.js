#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const envPath = path.join(__dirname, '..', '.env')
const envDistPath = path.join(__dirname, '..', '.env.dist')

// Si le fichier `.env` n'éxiste pas
if (!fs.existsSync(envPath)) {
  // Nous copions/collons le fichier `.env.dist` dans `.env`
  fs.copyFileSync(envDistPath, envPath)
}
