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
    let endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 7);
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() +1);
    tomorrow.setHours(0,0,0,0);
    if(startDate< tomorrow){
        throw error("날짜를 내일 이후로 설정해주세요");
    }
    return [startDate, endDate];
}