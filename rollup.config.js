import { swc } from 'rollup-plugin-swc3'
import fs from 'fs'

const swcrc = JSON.parse(fs.readFileSync('./rollup.swcrc.json'))

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  external: [
    'bcrypt',
    'body-parser',
    'cors',
    'dotenv',
    'express',
    'jsonwebtoken',
    'multer',
    'socket.io'
  ],
  plugins: [
    swc({
      include: /\.[jt]sx?$/, // default
      exclude: /node_modules/, // default
      tsconfig: 'tsconfig.json', // default
      ...swcrc
    })
  ]
}
