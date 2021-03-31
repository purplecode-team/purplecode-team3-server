const { PrismaClient } = require("@prisma/client");
const { getNow } = require("./middlewares");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
// const sgTransport = require("nodemailer-sendgrid-transport");
const smtpTransport = require("nodemailer-smtp-transport");
const dotenv = require("dotenv");
const prisma = new PrismaClient();

dotenv.config();
exports.generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// 매달(매월 1일 자정) 유저들의 점수 초기화

// exports.resetPoint = schedule.scheduleJob("00 00 00 * * * ", async () => {
//   let today = getNow();
//   today.setHours(9, 0, 0, 0); //오늘의 00시 00분 00초 로 바꿈
//   let tomorrow = new Date(today);
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   console.log(today, tomorrow);
//   const todayAuction = await prisma.product.findMany({
//     where: {
//       AND: [{ startDate: { gte: today } }, { startDate: { lte: tomorrow } }],
//     },
//   });
//   if (todayAuction.length > 0) {
//     for (let i = 0; i < todayAuction.length; i++) console.log("today product", todayAuction[i].id, todayAuction[i].title);
//   }
//   schedule.scheduleJob("00 * * * * *", async (todayAuction) => {
//     let now = getNow();
//     now.setSeconds(0, 0);
//     let later = new Date(now);
//     later.setMinutes(later.getMinutes() + 1);
//     console.log("now", now);
//     console.log("after 1minute", later);
//     for (let i = 0; i < todayAuction.length; i++) {
//       console.log(todayAuction[i].startDate);
//       if (todayAuction[i].startDate >= now && todayAuction[i].startDate <= later) {
//         console.log("auction 만들어", todayAuction[i].title);
//         await prisma.auction.create({
//           data: {
//             currentPrice: todayAuction[i].startPrice,
//             idSeller: todayAuction[i].idSeller,
//             idProduct: todayAuction[i].id,
//           },
//         });
//       }
//     }
//   });
// });

exports.generateSecret = () => {
  let randomNumber = "";
  for (let i = 0; i < 4; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
};

exports.sendSecretMail = async (email, tempPWD) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port : 587,
        host :'smtp.gmail.com',
        secure : false,
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
        },
    });
    //메일에 들어갈 정보
    var mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: "🔒eleket 임시 비밀번호 발급🔒",
        html: `임시비밀번호는 <strong>${tempPWD}</strong>입니다.<br/>`,
        };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw Error (error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
    
}