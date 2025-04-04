const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const router = require("express").Router();
const { MapCollection } = require("../../../db/Admin/schema");
const userVerification = require("../../middlewares/login_middleware");


const inferSchemaFromCollection = async (collectionName) => {
    try {
        const db = mongoose.connection.db;
        const collection = db.collection(collectionName);
        const sampleDoc = await collection.findOne();
        if (!sampleDoc) {
            console.log('No documents found in the collection.');
            return null;
        }

        console.log('Inferred Schema from Sample Document:', sampleDoc);
        return sampleDoc;
    } catch (error) {
        console.error('Error fetching schema:', error);
        return null;
    }
};

router.post("/",userVerification, async (req, res) => {
    try {
        const { CollectionId, password ,data} = req.body;
        const getCollection = await MapCollection.findOne({ key: CollectionId });
        if (!getCollection) {
            return res.status(404).json({ msg: "Community not found" });
        }

        const isMatch = await bcrypt.compare(password, getCollection.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        console.log(getCollection.field);
        const sampleData={user_id:req.user.id};
        const field = getCollection.field;
        for(let i=0;i<field.length;i++) {
            sampleData[field[i].data]=data[i];
        }
        console.log(sampleData);
        const s=getCollection.collectionName.toLowerCase()+"s";

        console.log("collection name:",s);
        await mongoose.connection.collection(s).insertOne(sampleData);
        const schemaData = await inferSchemaFromCollection(s);

        return res.json({ msg: "Joined community successfully", schema: schemaData });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
