module.exports = {
    Mutation: {
        //startDate받아서 Datetime형으로 변환 -> startDates
        //startDate받아서 Datetime형으로 변환 -> endDates
        //endDates에 7분더함
        uploadProduct: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);
            let {idCategory, title, description = "", startPrice, bidPrice, startDate, images} = args;
            const{user} = request;
            let startDates = new Date(startDate);
            let today = new Date();
            let tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0,0,0,0);
            //내일 날짜를 설정하는 과정
            if(startDates > tomorrow){
                let endDates = new Date(startDate);
                endDates.setMinutes(endDates.getMinutes() + 7); //endDates는 
                //startDate(STRING)을 받아서 startDates(DateTime)으로 변환해줌
                console.log(startDates);
                console.log(endDates);
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