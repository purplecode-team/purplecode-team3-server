module.exports = {
    Mutation: {
        toggleLike: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);       //request로 user가 들어오는것 같음
            const{productId} = args;
            const{user} = request;
            const likeProduct = await prisma.product.findUnique({
                where: {id:productId}
            });
            let likes = likeProduct.countLike;
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
                    likes --;
                    await prisma.product.update({
                        where: {id:productId},
                        data:{
                            countLike : likes
                        }
                    });
                }else{
                    await prisma.like.create({
                        data: {
                            user : {connect: {id : user.id}},
                            product : {connect: {id : productId}}
                        }
                    });
                    likes ++;
                    await prisma.product.update({
                        where: {id:productId},
                        data:{
                            countLike : likes
                        }
                    });
                }
            }catch(err){
                throw Error(err);
                return false;
            }
            return true;
        }
    }
}