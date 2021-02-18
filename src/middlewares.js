exports.isAuthenticated = (req)=>{
    if(!req.user){
        throw Error("Please Login or Sign Up");
    }
    return;
};