module.exports = {
    Query: {
        seeMe: async(_,args, {request, isAuthenticated, prisma})=>{
            isAuthenticated(request); 
            const{user} = request;
            return await prisma.user.findUnique({
                where: {id: user.id}
            });
        }
    }
};