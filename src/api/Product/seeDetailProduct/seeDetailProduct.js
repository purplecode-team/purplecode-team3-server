module.exports = {
  Query: {
    seeDetailProduct: async (_, args, { prisma }) => {
      const { id } = args;
      return prisma.product.findUnique({ where: { id } });
    },
  },
};
