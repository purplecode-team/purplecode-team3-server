const {CHANNEL_NEW_AUCTION} = require("../../../Constants");

module.exports = {
    Mutation: {
        buyAuction: async(_,args, {request, isAuthenticated,  prisma, pubsub})=>{
            isAuthenticated(request);
            const{user} = request;
            const{idAuction, idProduct, uploadPrice} = args;
            const products = await prisma.product.findUnique({
                where:{id : idProduct}
            });
            let auctions;
            if(!products.isAuction){
                auctions = await prisma.auction.create({
                    data:{
                        currentPrice: products.startPrice,
                        idBuyer : user.id,
                        idProduct : products.id,
                    }
                });
                console.log("isAuction을 true로 바꿈!!!!!");
                products.isAuction = true;
            }
            // console.log(products.bidCount);
            // let bidCounts = products.bidCount;
            // bidCounts += 1;
            auctions = await prisma.auction.update({
                where:{ id: idAuction},
                data: {
                    currentPrice : uploadPrice,
                    // bidCount : bidCounts
                }
            });
            console.log("가격 update 완료!!!");
            if(!auctions){   //error 처리
                throw Error ("Auction not found");
            }
            console.log("pubsub 실행");
            console.log(auctions);
            pubsub.publish(CHANNEL_NEW_AUCTION,{
                createAuction: auctions,
                idAuction: idAuction
            });
            return auctions;
        }
    }
};