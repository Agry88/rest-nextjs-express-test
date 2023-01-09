import dotenv from 'dotenv'
dotenv.config()

export type Config = {
  port: number
}

const config: Config = {
  port: process.env.PORT === undefined ? 3001 : Number(process.env.PORT)
}

export default config
