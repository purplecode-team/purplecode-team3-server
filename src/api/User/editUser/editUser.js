module.exports = {
    Mutation: {
        editUser: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);       //request로 user가 들어오는것 같음
            const{nickname, password, bio, profilePath} = args;
            const{user} = request;

            return prisma.updateUser({
                where:{
                    id:user.id,
                },
                data:{
                    nickname,
                    password,
                    bio,
                    profilePath
                }
            });
        }
    }
}