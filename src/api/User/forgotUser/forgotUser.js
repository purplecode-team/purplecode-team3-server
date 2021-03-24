module.exports = {
    Mutation: {
        forgotUser: async(_,args,{request, prisma})=>{
            const{action, email, phoneNum} = args;
            const{user} = request;
            if(!user){
                if(action == FINDID){
                    
                }else if(action == FINDPWD){

                }
            }
        }
    }
}