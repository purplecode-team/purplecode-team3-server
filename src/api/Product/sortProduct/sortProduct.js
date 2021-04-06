const NEW = "NEW";
module.exports = {
  Query: {
    sortProduct: async (_, args, { request, prisma }) => {
      const { action, productIds } = args;
      if (action == NEW) {
        const sortedProduct = await prisma.product.findMany({
          where: {
            OR: productIds.map((e) => {
              return { id: e };
            }),
          },
          orderBy: [{ createdAt: "desc" }],
        });
        return sortedProduct;
      }
    },
  },
};
