module.exports = {
  Query: {
      seeCategory: async(_,args, {request, isAuthenticated, prisma})=>{
          isAuthenticated(request); 
          const{user} = request;
          return await prisma.category.findMany({
            orderBy:{
              categoryName:'desc',
            }
          });
      }
  }
};