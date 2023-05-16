const {UserModel}=require("../models/user.model")
require("dotenv").config()
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


const register=async (req,res)=>{

    let {name,email,password,gender}=req.body

    try {
        let user=await UserModel.findOne({email})
        if(user){
            return res.status(400).send({"msg":"already exist please login"})
        }
        const hash = bcrypt.hashSync(password, 6);
        let newuser=new UserModel({name,email,password:hash,gender,role:"User"})
        await newuser.save()
        return res.status(200).send({"msg":"User registered successfully"})

    } catch (error) {
         return res.status(400).send(error)
    }
}




const login=async (req,res)=>{

    const {email,password}=req.body;

    try {
        
        const user=await UserModel.findOne({email})

        if(user){

            bcrypt.compare(password, user.password, (err, result)=> {
                
                if(result){
                    res.status(200).send({"success":true,"token":jwt.sign({userID:user._id}, process.env.AccessToken, { expiresIn: '1h' })})
                }else{
                    return res.status(400).send({"error":"Invalid Password"})
                }
            });

        }else{
            return res.status(400).send({"msg":"User NOt Found"})
        }

    } catch (error) {
         return res.status(400).send({"error":error.message})
    }
}

const logout=async(req,res)=>{
    const data=req.body;
}

const userGet=async(req,res)=>{

}

const userUpdate=async(req,res)=>{

}

const userDelete=async(req,res)=>{

}

const 




module.exports={register,login,logout,userGet,userUpdate,userDelete}