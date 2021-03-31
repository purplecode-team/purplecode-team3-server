const { generateSecret, sendSecretMail } = require("../../../utils");
const bcrypt = require("bcrypt");
const FINDID = "FINDID";
const FINDPWD = "FINDPWD";
module.exports = {
  Mutation: {
    forgotUser: async (_, args, { request, prisma }) => {
      const { action, phoneNum, email } = args;
      const { user } = request;
      if (!user) {
        if (action == FINDID) {
          const existUser = await prisma.user.findMany({
            where: { phoneNum },
          });
          console.log(existUser);
          if (existUser.length == 0) {
            throw Error("번호와 닉네임이 일치하는 유저가 없습니다.");
          } else {
            return existUser[0];
          }
        } else if (action == FINDPWD) {
          const existUser = await prisma.user.findMany({
            where: {
              AND: [{ phoneNum }, { email }],
            },
          });
          if (existUser.length == 0) {
            throw Error("번호와 이메일이 일치하는 유저가 없습니다.");
          } else {
            const tempPWD = generateSecret();
            console.log(tempPWD);
            await sendSecretMail(email, tempPWD);
            const hash = await bcrypt.hash(tempPWD, 12);
            return await prisma.user.update({ where: { email }, data: { password: hash } });
          }
        }
      } else {
        throw Error("logout 후 아이디 혹은 비밀번호 찾기를 진행해주세요");
      }
    },
  },
};