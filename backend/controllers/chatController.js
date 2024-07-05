import { create } from 'mathjs';
import Chat from '../models/messageModel.js';
export async function sendMessage(req,res,next){
    const {sender,receiver,message}= req.body;
    try{
        const newMessage= await Chat.create({
            sender:sender,
            users:[sender,receiver],
            message
        })
        return res.status(201).json({
            message:newMessage,
            message:'Message sent successfully',
            status:true
        })
    }catch(error){
        next(error);
    }
}

export async function getMessages(req,res,next){
    const {sender,receiver}= req.body;
    try{
        const messages= await Chat.find({
            users:{
                $all:[sender,receiver]
            }
        }).sort({createdAt:1})
        const updatedMessages= messages.map((message)=>{
            return {
                fromSelf:message.sender.toString()==sender,
                sender:message.sender,
                message:message.message,
                createdAt:message.createdAt
            }
        })
        return res.status(200).json({
            messages:updatedMessages,
            message:'Messages fetched successfully',
            status:true
        })
    }catch(error){
        next(error);
    }
}