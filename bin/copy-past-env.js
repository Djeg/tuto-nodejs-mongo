#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
let envPath = path.join(__dirname, '..', '.env')
let envDistPath = path.join(__dirname, '..', '.env.dist')

if (/win/.test(process.platform)) {
  envDistPath = envDistPath.slice(1).replace(/%20/g, ' ')
  envPath = envPath.slice(1).replace(/%20/g, ' ')
}

// Si le fichier `.env` n'éxiste pas
if (!fs.existsSync(envPath)) {
  // Nous copions/collons le fichier `.env.dist` dans `.env`
  fs.copyFileSync(envDistPath, envPath)
}
