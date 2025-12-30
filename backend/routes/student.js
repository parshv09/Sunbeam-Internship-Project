const express = require("express");
const cryptojs = require("crypto-js");
const router = express.Router();
const pool = require("../db/pool");
const utils = require("../utils/result");
const allowedRoles=require("../utils/allowedRoles")

router.get("/",allowedRoles("student"),(req,res)=>{
    sql="select * from students where email=?"
    pool.query(sql,[req.user.email],(error,data)=>{
        res.send(utils.createResult(error,data[0]))
    })
})
router.put("/change-password",allowedRoles("student","admin"),(req,res)=>{
    const {newPassword,confirmPassword}=req.body
    if(newPassword!=confirmPassword){
        res.send("password not matched")
    }
    const hashedPassword=cryptojs.SHA256(confirmPassword).toString()
    sql="update users set password= ? where email=?"
    pool.query(sql,[hashedPassword,req.user.email],(error,data)=>{
        res.send(utils.createResult(error,data));
    })
})


router.get("/my-courses",allowedRoles("student"),(req,res)=>{
    sql="select * from students s INNER JOIN course c on s.course_id=c.course_id where s.email=?"
    pool.query(sql,[req.user.email],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

router.get("/my-course-with-videos",allowedRoles("student"),(req,res)=>{
    const course_id=req.query.course_id
      // 1. Basic validation to prevent unnecessary queries
    if (!course_id) {
        return res.status(400).send(utils.createResult("Missing course_id", null));
    }
    sql=`SELECT *
    FROM students s
    JOIN course c ON s.course_id = c.course_id
    JOIN videos v ON v.course_id = c.   course_id
    WHERE s.email = ? AND c.course_id=?
    AND (v.added_at + INTERVAL c.video_expiry_days DAY) >= CURDATE();`
  pool.query(sql,[req.user.email,course_id],(error,data)=>{
    return res.send(utils.createResult(error,data))
  })
})  

module.exports = router;
