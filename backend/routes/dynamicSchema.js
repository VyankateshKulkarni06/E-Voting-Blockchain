

app.post("/",async(req,res)=>{
    const fieldsObject=req.body;
    // console.log(fieldsArray);

    const name=fieldsObject.name;
    const fieldarray=fieldsObject.field;
    // console.log(name);
    // console.log(fieldarray);
    const admin=adminSchema(name,fieldarray);


});