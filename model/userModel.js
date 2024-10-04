const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},
{
    timestamps:true
})

userModel.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userModel.methods.isPasswordsMatched = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}

userModel.methods.createPasswordResetToken = async ()=>{

        const resetToken = crypto.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto.createHash("sha256")
                                    .update(resetToken)
                                    .digest("hex");
        this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
        return resetToken;
}

module.exports =  mongoose.model("User",userModel);
