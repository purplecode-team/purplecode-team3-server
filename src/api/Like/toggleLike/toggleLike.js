module.exports = {
    Mutation: {
        toggleLike: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);       //request로 user가 들어오는것 같음
            const{productId} = args;
            const{user} = request;
            const filterOpts = {
                where: {
                    AND: [
                        {user : {id: user.id}},
                        {product : {id:productId}}
                    ]
                }
            };
            try{
                const existingLike = await prisma.like.count(filterOpts);
                if(existingLike > 0 ){
                    await prisma.like.deleteMany(filterOpts);
                }else{
                    await prisma.like.create({
                        data: {
                            user : {connect: {id : user.id}},
                            product : {connect: {id : productId}}
                        }
                    });
                }
            }catch(err){
                console.log(err);
                return false;
            }
            return true;
        }
    }
}