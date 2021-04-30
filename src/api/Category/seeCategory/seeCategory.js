module.exports = {
  Query: {
      seeCategory: async(_,args, {request, isAuthenticated, prisma})=>{
          return await prisma.category.findMany({
            orderBy:{
              categoryName:'desc',
            }
          });
      }
  }
};