import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    users:{
        type:Array,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true});


export default mongoose.model("chats",chatSchema);