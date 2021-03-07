/**
 * @description 메인페이지에 들어갈 시작 한시간전 상품들을 최신순으로 정렬
 * @TODO 여기에 상품정보뿐만아니라 남은시간도 반환하면 좋을 것 같음
 */
module.exports = {
  Query: {
    seeSoonProduct: async (_, args, { prisma }) => {
      const NOW = new Date();
      const BEFORE_ONEHOUR = new Date();
      BEFORE_ONEHOUR.setHours(NOW.getHours() - 1);
      console.log(BEFORE_ONEHOUR, NOW);
      return prisma.product.findMany({
        where: {
          startDate: {
            gt: BEFORE_ONEHOUR,
            lt: NOW,
          },
        },
        orderBy: [{ startDate: "asc" }],
      });
    },
  },
};
