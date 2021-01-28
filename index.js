const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: 'alice123',
      phone_num: '010-1234-5678',
      products: {
        create: { 
          name: 'mouse',
          description: 'this is really good',
          lower_limit_price: 3000,
        }
      },
    },
  })
  const allUsers = await prisma.user.findMany({
    include: {
      Product: true,
      Profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })