module.exports = {
    Query: {
        seeUser: async(_,args, {request, prisma})=>{
            if(!request.user){
                console.log("user 없당");
            }else{
                console.log("user 있당");
            }
            const{user} = request;
            const{nickname} = args;
            const person = await prisma.user.findUnique({
                where:{nickname}
            });
            if(user){                             //로그인 한 상태
                if(user.id == person.id){         //내 프로필 보려고 하면
                    return person;
                }else if(user.id != person.id){   //다른사람의 프로필 보려고 하면
                    return await prisma.user.findUnique({
                        where : {nickname},
                        select : {
                            nickname: true,
                            rating: true,
                            profilePath: true
                        }
                    })
                }
            }else{                                 //로그인 하지 않은 상태
                return await prisma.user.findUnique({
                    where : {nickname},
                    select: {
                        nickname : true,
                        rating : true,
                        profilePath: true,
                    }
                })
            }
        }
    }
};