import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
void prisma.$connect().then(() => {
  console.info('🚀 Prisma connected')
})

export default prisma
