const express =require("express")
const app=express()
require("dotenv").config()
const commonRouter=require("./routes/common")
const adminRouter=require("./routes/admin")

app.use(express.json())
app.use(commonRouter)
app.use("/admin",adminRouter)
app.listen(4000,()=>{
    console.log("server is running on port 4000")
})