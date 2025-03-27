const express=require("express");

const app=express();
const adminSchema=require("../db/Admin/schema");
const login = require("../backend/routes/users_login");
app.use(express.json());
// const admin=new adminSchema("John Doe","field1,field2,field3");
app.use("/login", login);
// console.log(admin.name);


app.listen(5001,()=>{
    console.log('listening on port 5000');
})