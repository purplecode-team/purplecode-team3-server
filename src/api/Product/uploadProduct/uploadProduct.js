const {GraphQLDateTime} = require("graphql-iso-date");
const {Product} = require("../product.js");
module.exports = {
    Mutation: {
        uploadProduct: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);
            let {idCategory, title, description = "", startPrice, bidPrice, startDate, endDate, images} = args;
            const{user} = request;
            console.log("Startdate", startDate);
            console.log("EndDate", endDate);
            console.log("EndDate to String", String(endDate));
            const product = await prisma.product.create({
                data:{
                    idCategory,
                    title,
                    description,
                    startPrice,
                    bidPrice,
                    startDate,
                    endDate,
                    idSeller: user.id
                    // user가 없다고 뜨는데.. 그럼 어떻게 connect 해야돼?
                }
            });
            images.forEach(async(image)=>{
                await prisma.image.create({
                    data:{
                        idProduct: product.id,
                        imagePath: image
                    }
                });
            });
            return product;
        }
    }
}
//Datetime
//connect