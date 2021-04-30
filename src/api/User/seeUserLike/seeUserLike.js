module.exports = {
    Query: {
        seeUserLike: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);       //request로 user가 들어오는것 같음
            const{user} = request;
            const userID = user.id;
            console.log(userID);

            return productIds = prisma.like.findMany({
                where: {idUser : userID},
            });
        }
    }
}