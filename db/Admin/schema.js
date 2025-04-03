const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateKey = require("../../backend/controllers/generateKey");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Voting", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// Function to sanitize collection names
const sanitizeCollectionName = (name) => {
    if (!name || typeof name !== "string") throw new Error("Invalid collection name");
    return name.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
};

// Function to create dynamic collections
const createDynamicCollection = async (collectionName, fieldsArray) => {
    try {
        // Sanitize the collection name
        collectionName = sanitizeCollectionName(collectionName);

        let schemaFields = {
            user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        };

        // Define fields based on provided types
        fieldsArray.forEach(field => {
            let fieldType = {};
            switch (field.type1) {
                case "String": fieldType = { type: String, required: true }; break;
                case "Number": fieldType = { type: Number, required: true }; break;
                case "Boolean": fieldType = { type: Boolean, required: true }; break;
                case "Date": fieldType = { type: Date, required: true }; break;
                default: fieldType = { type: String, required: true }; // Default to String
            }
            schemaFields[field.data] = fieldType;
        });

        console.log("✅ Final Collection Name:", collectionName);
        console.log("✅ Schema Fields:", schemaFields);

        // Create the new collection schema
        const dynamicSchema = new mongoose.Schema(schemaFields);
        mongoose.model(collectionName, dynamicSchema);

        return `Collection '${collectionName}' created successfully`;
    } catch (error) {
        console.error("❌ Error creating dynamic collection:", error);
        throw new Error(error.message);
    }
};

// Mapped Collection Schema (to track dynamic collections)
const mapCollectionSchema = new mongoose.Schema({
    collectionName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    key: { type: String, required: true }
});

// Mongoose Models
const MapCollection = mongoose.model("MappedCollection", mapCollectionSchema);
const User = mongoose.model("User", userSchema);

// Export Models & Functions
module.exports = { MapCollection, User, createDynamicCollection };
