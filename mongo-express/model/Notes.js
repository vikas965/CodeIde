import mongoose from "mongoose";

const UserNotes = mongoose.Schema({
    userid:String,
    title:String,
    content:String,   
})

const Usernotes = mongoose.model("UserNotes",UserNotes);

export default Usernotes;