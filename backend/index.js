import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  http from 'http';
import userRouter from './routes/userRoute.js';
import chatRouter from './routes/chatRoute.js';
import { Server, Socket, Server as SocketIOServer } from 'socket.io';
dotenv.config();
const app=express();
app.use(cors({
    origin:["https://allo-talk.devrudra.site"],
    credentials:true
}));
app.use(express.json());
const port=3000;
app.use("/api/auth",userRouter)
app.use("/api/chat",chatRouter)
mongoose.connect(process.env.MONGO_CLOUD_URL,{
}).then(()=>console.log('MongoDB connected')).catch((err)=>{
    console.log(err);
})
const server = http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:["https://allo-talk.devrudra.site"],
        methods: ["GET", "POST"],
        credentials:true
    }
})

global.onlineUsers= new Map()

io.on('connection',(socket)=>{
    global.chatSocket=socket;
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-message",(data)=>{
        const {receiver,message}= data
        const receiverSocketId= onlineUsers.get(receiver)
        if(receiverSocketId){
            socket.to(receiverSocketId).emit('receive-message',
                message
            )
        }
        
    })
})
server.listen(port, () => console.log(`Server is running on port ${port}`));