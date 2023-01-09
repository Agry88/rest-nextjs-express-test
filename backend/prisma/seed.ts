import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
          category: {
            create: {
              Catergory: {
                create: {
                  name: 'announcements'
                }
              }
            }
          }
        }
      ]
    }
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          category: {
            create: {
              Catergory: {
                create: {
                  name: 'announcements'
                }
              }
            }
          }
        }
      ]
    }
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          category: {
            create: {
              Catergory: {
                create: {
                  name: 'announcements'
                }
              }
            }
          }
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
          category: {
            create: {
              Catergory: {
                create: {
                  name: 'announcements'
                }
              }
            }
          }
        }
      ]
    }
  }
]

async function main(): Promise<void> {
  console.log('Start seeding ...')
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
