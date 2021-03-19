module.exports = {
    Query: {
        seeMe: async(_,args, {request, isAuthenticated, prisma})=>{
            isAuthenticated(request); 
            const{user} = request;
            return prisma.user.findUnique({
                where: {id: user.id}
            });
        }
    }
};