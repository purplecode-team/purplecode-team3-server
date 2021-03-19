const DELETE =  "DELETE";
const EDIT = "EDIT";
module.exports = {
    Mutation: {
        editProduct: async(_,args,{request, isAuthenticated,setDate, prisma})=>{
            isAuthenticated(request);
            const {action, id, idCategory, title, description, startPrice, bidPrice, startDate, images=[]} = args;
            const {user} = request;
            const products = await prisma.product.findUnique({
                where: {id}
            });
            console.log(products);
            if(user.id == products.idSeller){ //Login한 User와 Product Seller의 User가 같은지 확인
              if(action == EDIT){//수정하는경우
                if(startDate){//startDate를 수정하는경우
                  let [startDates,endDates] = setDate(startDate);
                  if(exist.length >0){
                    for(let i=0; i<exist.length; i++){       
                      if((exist[i].startDate< endDates && exist[i].startDate> startDates) || (exist[i].endDate< endDates && exist[i].endDate> startDates))
                          throw Error("같은 시간대에 진행하는 경매가 있습니다")
                  }
                }
                  await prisma.product.update({
                    where: {id},
                    data: {
                      idCategory, 
                      title, 
                      description, 
                      startPrice, 
                      bidPrice, 
                      startDate: startDates,
                      endDate: endDates
                    }
                  });    
                }else{//startDate를 수정하지 않는경우
                  await prisma.product.update({
                    where: {id},
                    data: {
                      idCategory, 
                      title, 
                      description, 
                      startPrice, 
                      bidPrice
                    }
                  });
                }
              console.log("prdocut update complished");
              if(images.length >0){//image를 수정하는경우
                images.forEach(async(image)=>{
                  await prisma.image.update({
                      data:{
                          idProduct: products.id,
                          imagePath: image
                      }
                  });
                });
              }
              return products;
              }else if(action == DELETE){//삭제하는경우
                return await prisma.product.delete({
                  where: {id}
                });
              }
            }else{
              throw error("User and Product Seller doesn't match");
            }
            
          }
        }
      }