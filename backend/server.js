const express =require("express")
const app=express()
require("dotenv").config()
const commonRouter=require("./routes/common")

app.use(express.json())
app.use(commonRouter)

app.listen(4000,()=>{
    console.log("server is running on port 4000")
})