import { Ctx } from '../types/context'
import { Router as expressRouter, Express } from 'express'

const router = expressRouter()

export default (ctx: Ctx, app: Express): expressRouter => {
  const { prisma } = ctx

  router.delete('/category/:id', async (req, res) => {
    const { id } = req.params

    const preCategory = await prisma.catergory.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (preCategory === undefined) {
      // #swagger.responses[404] = { description: 'category not found' }
      return res.status(404).json({ message: 'category not found' })
    }

    await prisma.catergoriesOnPosts.deleteMany({
      where: {
        catergoryId: Number(id)
      }
    })

    await prisma.catergory.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).send('Category deleted successfully')
  })

  router.get('/category', async (req, res) => {
    const result = await prisma.catergory.findMany()
    return res.status(200).json(result)
  })

  router.get('/category/:id', async (req, res) => {
    const { id } = req.params

    const rawPost = await prisma.catergory.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        posts: {
          select: {
            Post: {
              select: {
                id: true,
                title: true,
                content: true,
                authorId: true
              }
            }
          }
        }
      }
    })

    if (rawPost === null) { return res.status(404).json({ message: 'category not found' }) }

    const posts = rawPost.posts.map((post) => post.Post)

    return res.json(posts)
  })

  return router
}
