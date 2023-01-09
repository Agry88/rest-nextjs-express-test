import dotenv from 'dotenv'
dotenv.config()

export type Config = {
    port: number
}

const config: Config = {
    port: Number(process.env.PORT) || 3001,
}

export default config