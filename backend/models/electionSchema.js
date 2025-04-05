

const electionSchema = new mongoose.Schema({
    electionName : {
        type : String,

    },
    community_key:{
        type:String, required:true,
    },
    status : {
        type : String ,enum:["upcoming", "active","over"]
    },
    candidate_id: {
        type : [mongoose.Schema.Types.ObjectId],required:true
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    description : {
        type : String
    },
    applicabledept : {
        type : [String]
    }
});

const elections = mongoose.model("elections", electionSchema);
module.exports = elections;