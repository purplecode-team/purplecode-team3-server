module.exports = {
    Query: {
        searchProduct: async(_,args,{request, prisma})=>{
            const{user} = request;
            const {name="", startdate="", enddate="", startprice=0, endprice=999999999} = args;
            const result = await prisma.product.findMany({
                where:{
                    AND: [
                            {startDate: {gte: new Date(startdate)}},
                            {startDate: {lte: new Date(enddate)}},
                            {startPrice: {gte: startprice}},
                            {startPrice: {lte: endprice}},
                            {title:{contains: name}}
                        ]
                }
            })
            if(result.length == 0){
                console.error("조건에 맞는 상품이 없습니다.");
            }else{
                return result;
            }
            
        }
    }
}
//Datetime
//connect