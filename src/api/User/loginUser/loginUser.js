const {generateToken} = require("../../../utils");
const bcrypt = require("bcrypt");
module.exports = {
    Query: {
        loginUser: async(_,args,{request, prisma})=>{
            const{email, password} = args;
            console.log(password);
            const person = await prisma.user.findUnique({
                where: {email}
            });
            
            console.log("person.passsword", person.password);
            const result = await bcrypt.compare(password, person.password);
            console.log(result);
            if(result){
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