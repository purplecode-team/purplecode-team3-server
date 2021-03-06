module.exports = {
    Mutation: {
        //startDate받아서 Datetime형으로 변환 -> startDates
        //startDate받아서 Datetime형으로 변환 -> endDates
        //endDates에 7분더함
        uploadProduct: async(_,args,{request, isAuthenticated, setDate ,prisma})=>{
            isAuthenticated(request);
            let {idCategory, title, description = "", startPrice, bidPrice, startDate, usedDate, productNum ="", file} = args;
            const{user} = request;
            let [startDates, endDates] = setDate(startDate);
            const exist = await prisma.product.findMany({
                where:{idSeller:user.id}
            })
            if(exist.length >0){
                for(let i=0; i<exist.length; i++){       
                    if((exist[i].startDate< endDates && exist[i].startDate> startDates) || (exist[i].endDate< endDates && exist[i].endDate> startDates))
                        throw Error("같은 시간대에 진행하는 경매가 있습니다")
                }
            }
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
                    usedDate,
                    productNum,
                    idSeller: user.id
                }
            });

             //image upload/////////////////////////////////////////////////////////////////// url: `http://localhost:4000/images/${randomName}`,
            // file.forEach(async( )=>{
            //     let { createReadStream, filename} = await file;
            //     let { ext } = path.parse(filename);
            //     let randomName = generateRandomString(12) + ext;
        
            //     let stream = createReadStream();
            //     let pathName = path.join(__dirname, `/public/images/${randomName}`);
            //     await stream.pipe(fs.createWriteStream(pathName));
            //     let url = `http://localhost:4000/images/${randomName}`
            //     await prisma.image.create({
            //         data:{
            //             idProduct: product.id,
            //             imagePath: url
            //         }
            //     });
            // });
            return product;
        }
    }
}
//Datetime
//connect