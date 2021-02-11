exports.isAuthnticated = (req)=>{
    if(!res.user){
        throw Error("Please Login or Sign Up");
    }
    return;
};