const jwt =require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
require("dotenv").config()

const auth= async (req,res,next)=>{
    
    const authToken=req.headers.authorization;

    if(!authToken){
        return res.status(400).send({"msg":`Authorization Failed`})
    }

    const token=authToken.split(" ")[1];

    if(token){

        try {

           const isBlacklisted= await BlacklistModel.findOne({token});
           if(isBlacklisted){
            return res.status(401).send(`Token is blacklisted`)
           }

            var decodedToken = jwt.verify(token, process.env.AccessToken);
            if(decodedToken){
                req.body.userID=decoded.userID;
                next()
            }else{
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }else{
        return res.status(401).json({ message: 'Unauthorized' });
    }

}




module.exports={auth}