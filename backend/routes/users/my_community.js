
const router = require("express").Router();
const {User} = require("../../models/schema");
const userVerification = require("../../middlewares/login_middleware");

router.get("/",userVerification,async(req,res)=>{
    const user_id=req.user.id;
    const get_User=await User.findOne({_id:user_id});
    console.log(get_User);
    const communities=get_User.communities;
    console.log(communities);
    return res.json(communities);
});

module.exports=router;