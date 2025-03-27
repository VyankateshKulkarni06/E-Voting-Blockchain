const router=require('express').Router();
const {mapCollection,User}=require("../../db/Admin/schema");
const UserVerification=require("../middlewares/login_middleware");
const  bcrypt = require("bcrypt");
const salt = 7;
// const app=express();
const jwt=require('jsonwebtoken');

const inferSchemaFromCollection = async (collectionName) => {
    try {
      const db = mongoose.connection.db;
      const collection = db.collection(collectionName);
  
      // Find one document to infer schema
      const sampleDoc = await collection.findOne();
      if (!sampleDoc) {
        console.log('No documents found in the collection.');
        return;
      }
  
      console.log('Inferred Schema from Sample Document:', sampleDoc);
    } catch (error) {
      console.error('Error fetching schema:', error);
    }
  };


router.post("/community/user",abcd,(req,res)=>{
    const CollectionId=req.body;
    const getCollectionName=mapCollection.find({key:CollectionId});
    console.log(getCollectionName.collectionName);
    inferSchemaFromCollection(getCollectionName);
    return res.json({msg:"done"});
})  

router.post("/",UserVerification,async(req,res)=>{
    const {email,password}  = req.body;
    const newUser = await User.findOne({ email });
    try {
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
    
        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, name: newUser.username },
            secret,
            { expiresIn: 7200 }
        );
        return res.status(200).json({ msg: "Login successful", token });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: "Server error" });       
    }
})


router.post("/register",UserVerification,async(req,res)=>{
    const {username,password,email} = req.body;
    
    const salted = await bcrypt.genSalt(salt);
    const hashed = await bcrypt.hash(password, salted);
    const newUser = new User({ username, password, email });

    await newUser.save();
    
    
    return res.json({msg:"user Registered SuccessFully"});
});



module.exports=router;

