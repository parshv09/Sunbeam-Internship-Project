const express = require("express")
const router=express.Router()
const pool=require("../db/pool")
const utils=require("../utils/result")

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