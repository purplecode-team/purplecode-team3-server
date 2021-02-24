module.exports = {
    Product: {
      user: ({id}, _, {prisma}) => prisma.product.findUnique({where: {id}}).user(),
    }
  }