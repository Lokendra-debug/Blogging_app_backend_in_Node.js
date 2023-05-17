const jwt =require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
const { UserModel } = require("../models/user.model");
require("dotenv").config()


const auth= async (req,res,next)=>{
    
    const token=req.cookies.accessToken;

    if(token){

        try {

           const isBlacklisted= await BlacklistModel.findOne({token});
           if(isBlacklisted){
            return res.status(401).send(`Token is blacklisted`)
           }

            var decodedToken = jwt.verify(token, process.env.AccessToken);

            if(decodedToken){
                req.body.authorID=decodedToken.authorID;
                next()
            }else{
                return res.status(401).json({ message: 'Unauthorized2' });
            }
            
        } catch (error) {

            if (error.name === 'TokenExpiredError') {
                return res.status(401).send('Access token expired');
              }

            return res.status(401).json({ "message": 'Unauthorized3' });
        }

    }else{
        return res.status(401).json({ "message": 'Unauthorized' });
    }

}


module.exports={auth}