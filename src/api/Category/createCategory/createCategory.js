module.exports = {
  Mutation: {
    createCategory: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const { categoryName } = args;
      if (user.isAdmin) {
        const existName = await prisma.category.findMany({
          where: { categoryName },
        });
        if (existName && existName.length > 0) {
          console.error("이미 존재하는 카테고리 이름입니다.");
          return false;
        } else {
          await prisma.category.create({
            data: {
              categoryName,
            },
          });
          console.log("category 생성완료", categoryName);
          return true;
        }
      } else {
        console.error("관리자만 접근할 수 있습니다.");
        return false;
      }
    },
  },
};
