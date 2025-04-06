const router = require('express').Router();
const {Election,MapCollection,User} = require("../../models/schema");
const userVerification=require("../../middlewares/login_middleware");

router.post("/test",userVerification,async(req,res)=>{
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

        const voters=await collection.find(query).toArray();
        const cost_elections=voters.length*0.1;


        const savedElection = await newElection.save();
        res.status(201).json({ message: "Election created successfully", electionName:savedElection.electionName,cost:cost_elections,candidates:candidate_id,voter_array:voters});
    }
    catch(e){
        return res.status(400).json({msg:e.message});
    }
});


module.exports = router;
