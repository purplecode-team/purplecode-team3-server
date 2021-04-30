const NEW = "NEW";
const FAST = "FAST";
const HOT = "HOT";
const HIGHPRICE = "HIGHPRICE";
const LOWPRICE = "LOWPRICE";
module.exports = {
  Query: {
    sortProduct: async (_, args, { request, prisma }) => {
      const { action, productIds=-1} = args;
      if(productIds == -1){
        if(action == NEW){
          return await prisma.product.findMany({
            orderBy:{ createdAt:"desc"},
          });
        }else if(action == FAST){
          return await prisma.product.findMany({
            orderBy:{ startDate: "asc"},
          });
        }else if(action == HOT){
          return await prisma.product.findMany({
            orderBy:{ countLike : "asc"},
          });
        }else if(action == LOWPRICE){
          return await prisma.product.findMany({
            orderBy:{ startPrice: "asc"},
          });
        }else if(action == HIGHPRICE){
          return await prisma.product.findMany({
            orderBy:{ startPrice: "desc"},
          });
        }
      }
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
      else if (action == FAST) {
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
      else if(action == HOT){
        const sortedProduct = await prisma.product.findMany({
          where: {
            OR: productIds.map((e) => {
              return { id: e };
            }),
            AND: { isEnd: false },
          },
          orderBy: [{ countLike : "asc" }],
        });
        return sortedProduct;
      }
      else if(action == LOWPRICE){
        const sortedProduct = await prisma.product.findMany({
          where: {
            OR: productIds.map((e) => {
              return { id: e };
            }),
            AND: { isEnd: false },
          },
          orderBy: [{ startPrice: "asc" }],
        });
        return sortedProduct;
      }
      else if(action == HIGHPRICE){
        const sortedProduct = await prisma.product.findMany({
          where: {
            OR: productIds.map((e) => {
              return { id: e };
            }),
            AND: { isEnd: false },
          },
          orderBy: [{ startPrice: "desc" }],
        });
        return sortedProduct;
      }
    },
  },
};
