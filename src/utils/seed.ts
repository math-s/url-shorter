import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  await prisma.user.deleteMany({})
  await prisma.links.deleteMany({})

  const user = await prisma.user.create({
    data: {
      email: 'example@example.com',
      hashPassword: '1',
      name: 'example',
      role: 'USER'
    }
  })

  const links = await prisma.links.create({
    data: {
      long: 'example.com',
      title: 'example',
      author: {
        connect:
          {
            email: 'example@example.com'
          }
      }
    }
  })

  console.log(user)
  console.log(links)
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })
