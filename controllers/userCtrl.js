const asyncHandler = require("express-async-handler");
// const session = require("express-session");
const User = require("../model/userModel");
const session = require("express-session");


const registerUser = asyncHandler(async(req,res)=>{
    try{
        const {email,password,userName} = req.body;

        console.log("Registering User:",{email,password,userName});

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(409).json({message: "User Already Exists."})
        }else{
            const createdUser = await User.create({email,password,userName});
            if(createdUser){
                console.log("User Created:",createdUser);
                const req = {
                    body:{
                        email,password
                    }
                }
                // Call loginUser to login the user
                await loginUser(req,res);
            }
        }

    }catch(e){
        console.log("Error Registering User:",e);
        throw new Error(e)
    }
})


const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        const isMatched = await user.isPasswordsMatched(password);
        
        if(user && isMatched){
            session.user = user;
            return res.status(200).json({message: "Login Successful."})
        }else{
            return res.status(401).json({message: "Invalid Credentials."})
        }
    } catch (error) {
        throw new Error(error)
    }
    
    
})


module.exports = {registerUser,loginUser}