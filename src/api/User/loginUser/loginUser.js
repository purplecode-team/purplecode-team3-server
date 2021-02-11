const {generateToken} = require("../../../utils");
module.exports = {
    Query: {
        loginUser: async(_,args,{request, prisma})=>{
            const{email, password} = args;
            console.log(password);
            const person = await prisma.user.findUnique({
                where: {email}
            });
            console.log(person.password);
            console.log(password);
            if(person.password === password){
                console.log("LOGIN SUCCESS!", person);
                const token = generateToken(person.id);
                console.log("toke = " , token);
                return token;
            }else{
                throw Error("you got wrong PASSWORD");
            }
        }
    }
};