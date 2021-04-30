const {createWriteStream} = require("fs");

exports.isAuthenticated = (req)=>{
    console.log ("isAuthenticated 실행!~~!!~!~!~!~!~!~!~!~");
    if(!req.user){
        throw Error("Please Login or Sign Up");
    }
    return;
};
exports.setDate = (args) => {
    console.log("setTime 실행!");
    let startDate = new Date(args);
    startDate.setHours(startDate.getHours() + 9);
    let endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 13);
    const today = new Date();
    today.setHours(today.getHours()+9);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() +1);
    tomorrow.setHours(-15,0,0,0);
    if(startDate< tomorrow){
        throw Error("날짜를 내일 이후로 설정해주세요");
    }
    return [startDate, endDate];
}

exports.generateRandomString = (length) => {
    const result = [];
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

exports.storeUpload = ({stream, filename}) => {
    new Promise((resolve,reject) => {
      stream
        .pipe(createWriteStream(filename + "purple.png"))
        .on("finish", () => resolve())
        .on("error", reject)
    });
  }