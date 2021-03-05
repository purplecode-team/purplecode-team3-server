module.exports = {
  Mutation: {
    updateCategory: async (_, args, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const { beforeCategoryName, afterCategoryName } = args;
      if (user.isAdmin) {
        const exist = await prisma.category.findMany({
          where: { categoryName: beforeCategoryName },
        });
        if (exist && exist.length > 0) {
          const existName = await prisma.category.findMany({
            where: { categoryName: afterCategoryName },
          });
          if (existName && existName.length > 0) {
            console.error("이미 존재하는 카테고리 이름입니다.");
            return false;
          } else {
            await prisma.category.updateMany({
              where: { categoryName: beforeCategoryName },
              data: { categoryName: afterCategoryName },
            });
            console.log("category 변경완료", afterCategoryName);
            return true;
          }
        } else {
          console.error("존재하지 않는 카테고리 이름입니다.");
          return false;
        }
      } else {
        console.error("관리자만 접근할 수 있습니다.");
        return false;
      }
    },
  },
};
