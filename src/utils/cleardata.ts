import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  await prisma.user.deleteMany({})
  await prisma.links.deleteMany({})
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
