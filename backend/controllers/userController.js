import userModel from '../models/userModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
export async function signup(req,res,next){
    const {email,username,password}= req.body;
    // console.log(email,username,password)
    try{
        const userCheck= await User.findOne({
            email:email
        })
        if(userCheck){
            return res.status(200).json({
                message:'User already exists with this Email',
                status:false
            })
        }
        const hashedPassword= await bcrypt.hash(password,12)
        const newUser= await User.create({
            email,
            username,
            password:hashedPassword
        })
        return res.status(201).json({
            user:newUser,
            message:'User created successfully',
            status:true
        })
    }catch(error){
        // return res.status(500).json({
        //     message:'Internal Server Error'
        // })
        next(error);
    }
    // console.log('Signup Route') 
}

export async function login(req,res,next){
    const {email,password}= req.body;
    try{
        const user= await User.findOne({
            email:email,
        })
        const isSame= await bcrypt.compare(password,user?.password||"")
        if(isSame){
            return res.status(200).json({
                "user":user,
                message:'Successfully logged in',
                "status":true
            })
        }else {
            return res.status(200).json({
                message:'Invalid credentials',
                "status":false
            
            })
        }
    }catch(error){
        // return res.status(500).json({
            next(error);
            //     message:'Internal Server Error'
            // })
}
next("uncaught eror")
}

export async function logo(req,res){
    const userId=req.params.id
    // console.log(req.body.image);
    const user= await User.updateOne({
        _id:userId
    },{
        $set:{
            profilePic:req.body.image,
            isProfileSet:true
        }
    }).catch((err)=>{
        return res.status(500).json({
            message:'Internal Server Error'
        })
    })
    // console.log(user);
    return res.status(200).json({
        message:'Logo Route',
        "isSet":true,
    })
}

export async function getUsers(req,res){
    try{
        const users = await User.find({}).select('email username profilePic');
        return res.status(200).json({"users":users, message:"Success",status:true});
    }catch(e){
        return res.status(200).json({status:false, message:"Internal Server error"})
    }
} 