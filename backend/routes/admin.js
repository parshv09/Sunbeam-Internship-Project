const express = require("express")
const router=express.Router()
const pool=require("../db/pool")
const utils=require("../utils/result")


router.get("/course/all-courses",(req,res)=>{
    const {start_date,end_date}=req.query
    sql="select * from course where start_date BETWEEN ? and ?"
    pool.query(sql,[start_date,end_date],(error,data)=>{
        if(data.length==0){
            res.send("course not found between selected period")
        }else{
            res.send(utils.createResult(error,data))
        }
    })
})

router.post("/course/add",(req,res)=>{
    const {courseName, description, fees,startDate, endDate, videoExpireDays}=req.body
    sql="insert into course( course_name, description, fees, start_date, end_date, video_expiry_days) values (?,?,?,?,?,?)"
    pool.query(sql,[courseName, description, fees,startDate, endDate, videoExpireDays],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

router.put("/course/update/:courseId",(req,res)=>{
    const course_id=req.params.courseId
    const {courseName,description, fees, startDate, endDate,videoExpireDays}=req.body
    sql="update course set course_name=?,description=?, fees=?, start_date=?, end_date=? ,video_expiry_days=? where course_id=?"
    pool.query(sql,[courseName,description, fees, startDate, endDate,videoExpireDays,course_id],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

router.put("/video/update/:videoId",(req,res)=>{
    const videoId=req.params.videoId;
    const {courseId, title, youtubeURL, description}=req.body;
    sql="update videos set course_id=?,title=?,youtube_url=?,description=? where video_id=?";
    pool.query(sql,[courseId, title, youtubeURL, description, videoId],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

router.delete("/video/delete/:videoId",(req,res)=>{
    const video_id=req.params.videoId;
    sql="delete from videos where video_id= ?"
    pool.query(sql,[video_id],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})


router.get("/enrolled-students",(req,res)=>{
    const course_id=req.query.course_id;
    sql="select * from students where course_id= ?"
    pool.query(sql,[course_id],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

module.exports=router;