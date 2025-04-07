const express=require("express");

const app=express();
const login=require("../backend/routes/users/users_login");
const CommunityCreation=require("../backend/routes/admin/create_community");
const joinCommunity=require("../backend/routes/users/join_community");
const myCommunity=require("./routes/users/my_community");
const getSchema=require("./routes/admin/dynamic_schema_fetch");
const createElection=require("./routes/admin/create_election");
const activeElection=require("./routes/users/active_election");
const pastElections=require("./routes/users/past_election");

// console.log(admin.name);
app.use(express.json());
app.use("/user", login);
app.use("/admin/createCommunity",CommunityCreation);
app.use("/join_community",joinCommunity);
app.use("/myCommunity", myCommunity);
app.use("/getSchema", getSchema);
app.use("/createElection", createElection);
app.use("/activeElection", activeElection);
app.use("/pastElections", pastElections);

app.listen(5001,()=>{
    console.log('listening on port 5001');
})