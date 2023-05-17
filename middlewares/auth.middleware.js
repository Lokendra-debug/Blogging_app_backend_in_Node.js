const jwt =require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
const { UserModel } = require("../models/user.model");
require("dotenv").config()

const auth= async (req,res,next)=>{
    
    const AccessToken= req.headers.authorization
    if(!AccessToken){
        return res.status(400).send({"msg":`Authorization Failed`})
    }
    const token=AccessToken.split(" ")[1];

    if(token){

        try {

           const isBlacklisted= await BlacklistModel.findOne({token});
           if(isBlacklisted){
            return res.status(401).send(`Token is blacklisted`)
           }

            var decodedToken = jwt.verify(token, process.env.AccessToken);

            if(decodedToken){
                const { authorID } = decodedToken;
                const user=await UserModel.findById({authorID});
                if(!user){
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                req.body.authorID=decodedToken.authorID;
                next()
            }else{
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send('Access token expired');
              }
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }else{
        return res.status(401).json({ message: 'Unauthorized' });
    }

}


module.exports={auth}