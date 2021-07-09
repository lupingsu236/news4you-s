const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { Schema } = mongoose; 

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength:5}
}); 

userSchema.pre("save", async function(next) {
    //hash password before saving 
    const user = this;
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.post("save", function(error, doc, next){
    if(error.name === "MongoError" && error.code === 11000) {
        next(new Error("Username already registered"));
    } else {
        next(error);
    }
});

const getJwtBody = ({username}) => ({username});
userSchema.methods.generateAuthToken = async function() {
    //generate auth token for user 
    const user = this; 
    const token = jwt.sign(getJwtBody(user), process.env.JWT_KEY, {expiresIn: process.env.JWT_EXP});
    return token;
};  

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({username});
    if(!user) {
        throw new Error({error: "Invalid login credentials"})
    }
    const isMatched = await bcrypt.compare(password, user.password); 
    if(!isMatched) {
        throw new Error({error: "Invalid login credentials"})
    }
    return user; 
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User; 