const { User } = require("../../db/Admin/schema");


const electionSchema = new mongoose.Schema({
    electionName : {
        type : String,

    },
    community_key:{
        type:String, required:true,
    },
    status : {
        type : String ,enum:["upcoming", "active","over"],
        default: "upcoming"
    },
    candidate_id: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required:true
        }
        
    ],
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    description : {
        type : String
    },
    applicableFields : [
        {
            field : {type : String, required : true},
            value : {type : String, required : true},
        }
    ],
    results:[
        {
            candidate_id : {type : mongoose.Schema.Types.ObjectId,required:true},
            votes : {type : Number}
        }
        
    ]
});

const elections = mongoose.model("elections", electionSchema);
module.exports = elections;