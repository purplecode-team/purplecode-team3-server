const passport = require("passport");
const {Strategy, ExtractJwt} = require("passport-jwt");
const {PrismaClient} = require("@prisma/client");
const { getUserTypesFromSchema } = require("graphql-tools");
const { verify } = require("jsonwebtoken");
const prisma = new PrismaClient()

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
};

const verifyUser = async(payload, done)=>{
    try{
        const user = await prisma.user.findOne({
            where : {id : payload.id}
        });
        if (user){
            return done (null, user);
        }else{
            return done (null, false);
        }
    }catch(err){
        return done(error, false);
    }
};

exports.authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
// passport.use(new JwtStrategy(jwtOptions, async(jwt_payload,done) =>{
//     try {
//         const user = await prisma.user.findOne({
//             where: {id: jwt_payload.id}
//         });
//         if(user){
//             return done (null,user);
//         }else {
//             return done (null, false);
//         }
//     }catch(error){
//         return done(error, false);
//     }
// } ));