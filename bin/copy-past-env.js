import { existsSync, copyFileSync } from 'fs'

console.log('Copy past env file ...')

if (!existsSync('./.env')) {
  console.log('Creating .env file ...')
  copyFileSync('./.env.dist', './.env')
} else {
  console.log('.env already exists')
}

console.log('DONE :)')
