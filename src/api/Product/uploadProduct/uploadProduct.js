module.exports = {
    Mutation: {
        uploadProduct: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);
            let {idCategory, title, description = "", startPrice, bidPrice, startDate, endDate, images} = args;
            const{user} = request;
            let startDates = new Date(startDate);
            let endDates = new Date(endDate);
            //startDate(STRING)을 받아서 startDates(DateTime)으로 변환해줌
            console.log(startDates);
            let today = new Date();
            console.log(today);
            let tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0,0,0,0);
            console.log(tomorrow);
            if(startDates > tomorrow){
                console.log("내일 이후임 true");
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
            }else{
                console.error("날짜를 내일 이후로 설정해주세요");
            }



            
        }
    }
}
//Datetime
//connect