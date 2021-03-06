module.exports = {
    Mutation: {
        //startDate받아서 Datetime형으로 변환 -> startDates
        //startDate받아서 Datetime형으로 변환 -> endDates
        //endDates에 7분더함
        uploadProduct: async(_,args,{request, isAuthenticated, setDate, prisma})=>{
            isAuthenticated(request);
            let {idCategory, title, description = "", startPrice, bidPrice, startDate, images} = args;
            const{user} = request;
            let [startDates, endDates] = setDate(startDate);
            console.log(startDates, endDates);
            const product = await prisma.product.create({
                data:{
                    idCategory,
                    title,
                    description,
                    startPrice,
                    bidPrice,
                    startDate: startDates,
                    endDate : endDates,
                    idSeller: user.id
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