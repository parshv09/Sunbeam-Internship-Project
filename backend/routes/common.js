const express=require("express")
const router=express.Router()
const pool=require("../db/pool")
const utils=require("../utils/result")
const cryptojs=require("crypto-js")
const jwt=require("jsonwebtoken")


router.post("/register-to-course",(req,res)=>{
    if(!req.body){
        res.send("please enter all fields")
    }
    const  {courseId, email ,name, mobileNo}=req.body
    sql="select * from users where email=?"
    pool.query(sql,[req.body.email],(error,data)=>{
        if(data.length==0){
            pass="sunbeam123"
            s="insert into users(email,password,role) values(?,?,?)"
            pool.query(s,[email,pass,"student"],(error,data)=>{
                if(error){
                    res.send(utils.createResult(error))
                }
            })  
        }
            sql="insert into students (course_id, email, name ,mobile_number) values (?,?,?,?)"
            pool.query(sql,[courseId,email,name,mobileNo],(error,data)=>{
                res.send(utils.createResult(error,"course registration successfully"))
            })
        
    });
})
router.post("/auth/login",(req,res)=>{
    const {email,password}=req.body
    const hashPassword=cryptojs.SHA256(password).toString()
    sql="select * from users where email=? and password=?"
    pool.query(sql,[email,hashPassword],(error,data)=>{
        if(error){
            res.send(utils.createResult(error))
        }else if(data.length==0){
            res.send(utils.createResult("invalid email or password"))
        }else{
            const user=data[0]
            const payload={
                email:user.email,
                role:user.role
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET)
            userdata={
                email:user.email,
                role:user.role,
                token
            }
            res.send(utils.createResult(null,userdata))
        }

    })
    

})

router.get("/course/all-active-courses",(req,res)=>{
    const sql="SELECT * FROM course where (start_date >= CURDATE()) or (CURDATE() BETWEEN start_date AND end_date)"
    pool.query(sql,(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


module.exports=router