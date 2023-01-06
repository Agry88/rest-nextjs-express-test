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
      category: {
        create: {
          catergoryId: Number(catergoryId)
        }
      }
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

  await prisma.catergoriesOnPosts.deleteMany({
    where: {
      postId: Number(id)
    }
  })

  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })

  res.status(200).send("Post deleted successfully")
})

app.delete(`/category/:id`, async (req, res) => {

  const { id } = req.params

  const preCategory = await prisma.catergory.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!preCategory) {
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
      id: Number(id),
    },
  })

  res.status(200).send("Category deleted successfully")
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

  const { email } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return res.status(400).json({ message: 'user already exists' })
  }

  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
})

app.get(`/user`, async (req, res) => {
  // #swagger.tags = ['user']
  const result = await prisma.user.findMany()
  return res.status(200).json(result)
})

app.get('/user/:id', async (req, res) => {
  // #swagger.tags = ['user']
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json(user)
})

app.get(`/category`, async (req, res) => {
  // #swagger.tags = ['category']
  const result = await prisma.catergory.findMany()
  return res.status(200).json(result)
})

app.get(`/category/:id`, async (req, res) => {
  // #swagger.tags = ['category']
  const { id } = req.params

  const rawPost = await prisma.catergory.findUnique({
    where: {
      id: Number(id),
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
      },
    }
  })

  if (!rawPost) return res.status(404).json({ message: 'category not found' })

  const posts = rawPost.posts.map((post) => post.Post)

  return res.json(posts)
})

const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001',
  ),
)


// type rawPost = {
//   id: number
//   name: string
//   posts: {
//     Post: Post[]
//   }[]
// }

// type Post = {
//   id: number
//   title: string
//   content: string
// }