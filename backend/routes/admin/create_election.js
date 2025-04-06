const bcrypt = require('bcrypt');
const router = require('express').Router();
const {Election} = require("../../models/schema");
const userVerification=require("../../middlewares/login_middleware");

router.post("/",userVerification,async(req,res)=>{
    try{
        const {
        electionName,
        community_key,
        status,
        candidate_id,
        startDate,
        endDate,
        description,
        applicableFields,
        results
        } = req.body;

        const newElection = new Election({
            electionName,
            community_key,
            status,
            candidate_id,
            startDate,
            endDate,
            description,
            applicableFields,
            results
        });

        const savedElection = await newElection.save();
        res.status(201).json({ message: "Election created successfully", data: savedElection});
    }
    catch(e){
        return res.status(400).json({msg:e.message});
    }
});

module.exports = router;
