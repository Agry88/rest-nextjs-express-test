import { Ctx } from '../types/context'
import { Router as expressRouter, Express } from 'express'

export default (ctx: Ctx, app: Express): expressRouter => {
  const router = expressRouter()
  const { prisma } = ctx

  router.get('/drafts', async (req, res) => {
    // #swagger.summary = '取得所有的未公開Post'
    // #swagger.description = '無需輸入body跟header來取得所有的未公開Post'
    // #swagger.operationId = 'getPostswithoutPublished'
    const posts = await prisma.post.findMany({
      where: { published: false },
      include: { author: true }
    })
    res.json(posts)
  })

  router.get('/feed', async (req, res) => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true }
    })
    res.json(posts)
  })

  router.get('/filterPosts', async (req, res) => {
    const { searchString }: { searchString?: string } = req.query
    const filteredPosts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString
            }
          },
          {
            content: {
              contains: searchString
            }
          }
        ]
      }
    })
    res.json(filteredPosts)
  })

  router.post('/', async (req, res) => {
    // #swagger.summary = '新增Post'
    // #swagger.description = '利用body裡的資訊新增Post'
    // #swagger.operationId = 'createPost'
    /* #swagger.parameters['PostBody'] = {
      in: 'body',
      description: 'Body 需要以下欄位',
      schema: {
        $title: '新的文章標題',
        $content: '新的文章內容',
        $authorEmail: 'AgryEmail',
        $catergoryId: '2'
      }
    } */
    /* #swagger.responses[200] = {
            description: '成功創建Post',
            schema: {
              $title: '新的文章標題',
              $content: '新的文章內容',
              $authorEmail: 'AgryEmail',
              $catergoryId: '2'
            }
    } */
    const { title, content, authorEmail, catergoryId } = req.body
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } },
        category: {
          create: {
            catergoryId: Number(catergoryId)
          }
        }
      }
    })
    res.json(result)
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const prepost = await prisma.post.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (prepost === undefined) {
      // #swagger.responses[404] = { description: 'post not found' }
      return res.status(404).json({ message: 'post not found' })
    }

    await prisma.catergoriesOnPosts.deleteMany({
      where: {
        postId: Number(id)
      }
    })

    await prisma.post.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).send('Post deleted successfully')
  })

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id)
      },
      include: { author: true }
    })
    res.json(post)
  })

  router.put('/publish/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true }
    })
    res.json(post)
  })

  return router
}
