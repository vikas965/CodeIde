import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password: String
})

const Userdetails = mongoose.model("Userdetails",UserSchema);

export default Userdetails;