const express = require("express");
const cryptojs = require("crypto-js");
const router = express.Router();
const pool = require("../db/pool");
const utils = require("../utils/result");


router.get("/",(req,res)=>{
    sql="select * from students where email=?"
    pool.query(sql,[req.user.email],(error,data)=>{
        res.send(utils.createResult(error,data[0]))
    })
})
router.put("/change-password",(req,res)=>{
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


router.get("/my-courses",(req,res)=>{
    sql="select s.name , c.course_name from students s INNER JOIN course c on s.course_id=c.course_id where s.email=?"
    pool.query(sql,[req.user.email],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

router.get("/my-course-with-videos",(req,res)=>{
    sql=`SELECT c.course_name,
    c.start_date,
    c.end_date,
    c.video_expiry_days,
    v.title,
    v.youtube_url
    FROM students s
    JOIN course c ON s.course_id = c.course_id
    JOIN videos v ON v.course_id = c.course_id
    WHERE s.email = ?
    AND (v.added_at + INTERVAL c.video_expiry_days DAY) >= CURDATE();`
  pool.query(sql,[req.user.email],(error,data)=>{
    res.send(utils.createResult(error,data))
  })
})

module.exports = router;
