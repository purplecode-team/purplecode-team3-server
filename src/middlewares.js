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

exports.getNow = ()=>{
    console.log("getToday 실행!");
    let now = new Date();
    now.setHours(now.getHours() + 9);
    return now;
}