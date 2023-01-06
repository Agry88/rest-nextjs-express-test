import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import swaggerUi from "swagger-ui-express"
import swaggerFile from '../src/swagger_output.json'

const prisma = new PrismaClient()
const app = express()


app.use(express.json())
app.use(cors())

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.get('/drafts', async (req, res) => {
  // #swagger.tags = ['post']
  // #swagger.summary = 'Get all drafts'
  // #swagger.description = 'Some description...'
  // #swagger.operationId = 'Your_operationId_here'
  const posts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true }
  })
  res.json(posts)
})

app.get('/feed', async (req, res) => {
  // #swagger.tags = ['post']
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })
  res.json(posts)
})

app.get('/filterPosts', async (req, res) => {
  // #swagger.tags = ['post']
  const { searchString }: { searchString?: string } = req.query;
  const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  })
  res.json(filteredPosts)
})

app.post(`/post`, async (req, res) => {
  // #swagger.tags = ['post']
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Some description...',
    schema: {
      $title: 'title here',
      $content: 'content here',
      $authorEmail: 'email here',
      $catergoryId: 'catid here'
    }
  } */
  const { title, content, authorEmail, catergoryId } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
      category: { connect: catergoryId }
    },
  })
  res.json(result)
})

app.delete(`/post/:id`, async (req, res) => {
  // #swagger.tags = ['post']
  const { id } = req.params

  const prepost = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!prepost) {
    // #swagger.responses[404] = { description: 'post not found' }
    return res.status(404).json({ message: 'post not found' })
  }

  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

app.get(`/post/:id`, async (req, res) => {
  // #swagger.tags = ['post']
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: { author: true }
  })
  res.json(post)
})

app.put('/publish/:id', async (req, res) => {
  // #swagger.tags = ['post']
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })
  res.json(post)
})

app.post(`/user`, async (req, res) => {
  // #swagger.tags = ['user']
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
})

const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001',
  ),
)
