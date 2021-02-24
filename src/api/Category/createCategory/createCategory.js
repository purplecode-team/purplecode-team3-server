module.exports = {
    Mutation: {
        createCategory: async(_,args,{request, isAuthenticated, prisma})=>{
            isAuthenticated(request);       //request로 user가 들어오는것 같음
            const{user} = request;
            const{categoryName} = args;
            if(user.isAdmin){
                await prisma.category.create({
                    data:{
                        categoryName
                    }
                })
                console.log("category 생성완료", categoryName);
                return true;
            }else{
                console.error("접근권한이 없습니다.");
                return false;
            }
        }
    }
}