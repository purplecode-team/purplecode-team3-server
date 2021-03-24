const bcrypt = require("bcrypt");
module.exports = {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const { email, nickname, password, phoneNum, bio = "", isAdmin = false } = args;
      const exist = await prisma.user.findMany({
        where: {
          OR: [{ email }, { nickname }, {phoneNum}],
        },
      });
      console.log("exist ==", exist);
      if (exist && exist.length > 0) {
        if (exist.filter((user) => user.email == email).length > 0) {
          throw Error("This email already beeing used. Please use another email");
        } else if (exist.filter((user) => user.nickname == nickname).length > 0) {
          throw Error("This nickname already beeing used. Please use another nickname");
        } else if (exist.filter((user) => user.phoneNum == phoneNum).length > 0) {
          throw Error("This phoneNumber already beeing used");
        }
      }
      console.log("이전 password", password);
      const hash = await bcrypt.hash(password, 12);
      console.log("hash", hash);
      const user = await prisma.user.create({
        data: {
          email,
          nickname,
          password: hash,
          phoneNum,
          bio,
          isAdmin,
        },
      });
      console.log(user);
      return true;
    },
  },
};
