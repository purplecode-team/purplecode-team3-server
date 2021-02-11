module.exports = {
    Mutation: {
        createAccount: async(_,args,{prisma})=>{
            const{email, nickname, password, bio = ""} = args;
            const exist = await prisma.user.findMany({
                where : {
                   OR: [{email},{nickname}]
                }
            });
            console.log("exist ==", exist);
            if(exist && exist.length > 0){
                if(exist.filter(user => user.email == email).length > 0){
                    throw Error("This email already beeing used. Please use another email");
                }else if (exist.filter(user => user.nickname == nickname).length > 0){
                    throw Error("This nickname already beeing used. Please use another nickname");
                }
            }
            const user = await prisma.user.create({
                data:{
                email,
                nickname,
                password,
                bio},
            });
            console.log(user);
            return user;
        }
    }
}