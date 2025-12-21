const jwt=require("jsonwebtoken")
const utils=require("../utils/result")


function verifyToken(req,res,next){
    const token=req.headers.token;
    if(!token){
        res.send(utils.createResult("Token not found"));
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET)
        req.user=data
        next();
    }catch(ex){
        res.send(utils.createResult("invalid token"))
    }
    
}
module.exports=verifyToken;