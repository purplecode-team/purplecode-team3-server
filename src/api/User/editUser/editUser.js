const bcrypt = require("bcrypt");
module.exports = {
    Mutation: {
        editUser: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);       //request로 user가 들어오는것 같음
            const{nickname, password, bio, profilePath} = args;
            const{user} = request;
            console.log(password);
            if(password){
                var hash = await bcrypt.hash(password,12);
            }
            //hash 부분 좀더 깔끔하게 정리 가능?

            return prisma.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    nickname,
                    password : hash,
                    bio,
                    profilePath
                }
            });
        }
    }
}