const NEW = "NEW";
const FAST = "FAST";
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
      if (action == FAST) {
        // productIds에서 똑같이 받아오고 이때 startDate를 asc순, isend가 0인 경우만
        const sortedProduct = await prisma.product.findMany({
          where: {
            OR: productIds.map((e) => {
              return { id: e };
            }),
            AND: { isEnd: false },
          },
          orderBy: [{ startDate: "asc" }],
        });
        return sortedProduct;
      }
    },
  },
};
