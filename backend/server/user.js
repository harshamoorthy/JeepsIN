const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate:{
            validator:value=>validator.isEmail(value),
            message:"Invalid email format...please enter a proper email"
        }
    }
});

//hashing the password before saving it
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password,salt);
    }
    next();
})


const userModel = mongoose.model("user",userSchema);

module.exports = userModel;