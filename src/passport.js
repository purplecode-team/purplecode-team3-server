const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization 헤더에서 jwt를 추출해낸다.
  // -> {Authorization : 'Bearer [TOKEN]'} 형태임
  secretOrKey: process.env.JWT_SECRET, // TOKEN해독 방식
};

const verifyUser = async (payload, done) => {
  //payload is an object literal containing the decoded JWT payload
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });
    console.log("email은", user.email);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

exports.authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
      // express router
      // authenticate를 진행하게 되면 req.user에는 user가 serialize 되기 때문에
      // 그 뒤 요청에는 req.uesr가 존재하게 된다.(로그인됨)
      // 로그인 되어있다면
      // graphql 함수 실행 시에 req.user 값을 보고 처리할 수 있게 된다.
      // 기본적인 로그인 인증과정, 로그인 관리방법이다.
    } else {
      console.error(error);
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser)); //TOKEN을 입력받아서 정보를 해석하여 CB로 정보를 넘겨줌
passport.initialize();
