const router = require('express').Router();
const {Election,MapCollection} = require("../../models/schema");
const userVerification=require("../../middlewares/login_middleware");
const mongoose=require("mongoose");
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

        const mapCollection = await MapCollection.findOne({key: community_key});
        const collectionName=mapCollection.collectionName.toLowerCase()+"s";
        const db = mongoose.connection.db;
        const collection = db.collection(collectionName);
        const query = {};
            applicableFields.forEach(({ field, value }) => {
            query[field] = value;
        });
        console.log(query);

        const voters = await collection.find(query, { projection: { _id: 1 } }).toArray();

        const cost_elections=voters.length*0.01;


        const savedElection = await newElection.save();
        res.status(201).json({ message: "Election created successfully", electionName:savedElection.electionName,cost:cost_elections,candidates:candidate_id,voter_array:voters});
    }
    catch(e){
        return res.status(400).json({msg:e.message});
    }
});


module.exports = router;
