const generateKey = require("../../backend/controllers/generateKey");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Voting")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB", err);
})
// const getType = (type) => {
//     const types = {
//       String: String,
//       Number: Number,
//       Boolean: Boolean,
//       Date: Date,
//       ObjectId: mongoose.Schema.Types.ObjectId
//     };
  
//     return types[type] || String; // Default type is String
//   };

const User=new mongoose.Schema({
    username: {type: String,required: true},
    email:{type:String,unique:true,required: true},
    password:{type:String,required: true},
});

  const createDynamicCollection = async (collectionName, fieldsArray) => {
    let schemaFields = {};

    fieldsArray.forEach(field => {
        let a = {};

        if (field.type1 === "String") {
            a = { type: String, required: true };
        } else if (field.type1 === "Number") {
            a = { type: Number, required: true };
        } else if (field.type1 === "Boolean") {
            a = { type: Boolean, required: true };
        } else if (field.type1 === "Date") {
            a = { type: Date, required: true };
        }

        schemaFields[field.data] = a;
    });

    console.log(schemaFields); 


    // console.log(schemaFields);/

  
    const dynamicSchema = new mongoose.Schema(schemaFields);
    const DynamicModel=mongoose.model(collectionName, dynamicSchema);
    const newData = await DynamicModel.create({ name: "Vyankatesh",PRN:"7230023B",Roll:23309,Age:90 });
    console.log(`Collection '${collectionName}' created successfully`);
}


const mapCollection=new mongoose.Schema({
    collectionName: {type:String,required:true},
    key:{type:String,required:true}

});
module.exports = {createDynamicCollection,mapCollection,User};
