import { Ctx } from '../types/context'
import { Router as expressRouter, Express } from 'express'

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()
  const { prisma } = ctx

  router.post('/', async (req, res) => {
    const { email } = req.body
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (user === undefined) {
      return res.status(400).json({ message: 'user already exists' })
    }

    const result = await prisma.user.create({
      data: {
        ...req.body
      }
    })

    return res.json(result)
  })

  router.get('/', async (req, res) => {
    const result = await prisma.user.findMany()
    return res.status(200).json(result)
  })

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (user === null) {
      return res.status(404).json({ message: 'user not found' })
    }
    return res.json(user)
  })

  return router
}
