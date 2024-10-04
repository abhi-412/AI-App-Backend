const mongoose = require("mongoose");


const dbConnect =async ()=>{
    try {
        const connection =  mongoose.connect("mongodb://localhost:27017/",{
            dbName:"abhi",
            useNewUrlParser:true
        });
        connection.then(()=>{console.log("Database Connected")})
        
    } catch (error) {
        console.log("Error connecting to DB",error)
    }    
}

module.exports = dbConnect;