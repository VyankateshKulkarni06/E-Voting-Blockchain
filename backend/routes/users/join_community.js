const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const router = require("express").Router();
const { MapCollection } = require("../../../db/Admin/schema");

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

router.post("/", async (req, res) => {
    try {
        const { CollectionId, password } = req.body;
        const getCollectionName = await MapCollection.findOne({ key: CollectionId });
        if (!getCollectionName) {
            return res.status(404).json({ msg: "Community not found" });
        }

        const isMatch = await bcrypt.compare(password, getCollectionName.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password" });
        }
        const schemaData = await inferSchemaFromCollection(getCollectionName.collectionName);

        return res.json({ msg: "Joined community successfully", schema: schemaData });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
