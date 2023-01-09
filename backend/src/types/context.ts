import { Config } from '../configs/index'
import { PrismaClient } from '@prisma/client'

export type Ctx = {
  prisma: PrismaClient
  config: Config
}
