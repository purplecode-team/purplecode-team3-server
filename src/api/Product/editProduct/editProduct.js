const DELETE =  "DELETE";
const EDIT = "EDIT";
module.exports = {
    Mutation: {
        editProduct: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);
            const {action, id, idCategory, title, description, startPrice, bidPrice, startDate, images=[]} = args;
            const {user} = request;
            const products = await prisma.product.findUnique({
                where: {id}
            });
            console.log(products);
            if(user.id == products.idSeller){ //Login한 User와 Product Seller의 User가 같은지 확인
              if(action == EDIT){
                let endDates;
                if(startDate){
                  let today = new Date();
                  let tomorrow = new Date(today);
                  tomorrow.setDate(tomorrow.getDate() +1);
                  tomorrow.setHours(0,0,0,0);
                  endDates = new Date(startDate);
                  endDates.setMinutes(endDates.getMinutes() + 7);
                  if(new Date(startDate) < tomorrow){
                    console.error("날짜를 내일 이후로 설정해주세요");
                  }
                  await prisma.product.update({
                    where: {id},
                    data: {
                      idCategory, 
                      title, 
                      description, 
                      startPrice, 
                      bidPrice, 
                      startDate: new Date(startDate),
                      endDate: endDates
                    }
                  });    
                }
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
              console.log("prdocut update complished");
              if(images.length >0){
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
              }else if(action == DELETE){
                return await prisma.product.delete({
                  where: {id}
                });
              }
            }else{
              console.error("User and Product Seller doesn't match");
            }
            
          }
        }
      }