const mysql2=require("mysql2")
const connection=mysql2.createPool({
    host:process.env.host,
    user:process.env.user,
    password : process.env.password,
    database: process.env.database,
    port:process.env.port
})

module.exports=connection;