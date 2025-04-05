const pastElectionSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    winner : {
        type : {
            winnername : {type : String},
            finalvotes : {type : Number} 
        }
    }

})

const pastElections = mongoose.model("pastElections", pastElectionSchema);

module.exports = pastElections;