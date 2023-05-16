const jwt =require("jsonwebtoken")
require("dotenv").config()

const auth= async (req,res,next)=>{
    
    const authToken=req.headers.authorization;

    if(!authToken){
        return res.status(400).send({"msg":`Authorization Failed`})
    }

    const token=authToken.split(" ")[1];

    if(token){

        try {
            var decoded = jwt.verify(token, process.env.AccessToken);

            if(decoded){
                req.body.userID=decoded.userID;
                next()
            }else{
                return res.status(400).send({"msg":"Login Required"})
            }
            
        } catch (error) {
            return res.status(400).send("Token is Not Valid ")
        }
    }else{
        return res.status(400).send({"msg":"Login Required"})
    }

}




module.exports={auth}