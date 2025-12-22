const utils=require("./result")
function allowedRoles(roles){
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).send(utils.createResult("not a valid user",null))
        }else{
            next()
        }
    }
}
module.exports=allowedRoles;