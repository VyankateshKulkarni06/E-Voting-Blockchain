const express=require("express");

const app=express();
const adminSchema=require("../db/Admin/schema");
const login=require("../backend/routes/users/users_login");
const CommunityCreation=require("../backend/routes/admin/create_community");
const joinCommunity=require("../backend/routes/users/join_community");

// console.log(admin.name);
app.use(express.json());
app.use("/user", login);
app.use("/admin/createCommunity",CommunityCreation);
app.use("/join_community",joinCommunity);
app.listen(5001,()=>{
    console.log('listening on port 5001');
})