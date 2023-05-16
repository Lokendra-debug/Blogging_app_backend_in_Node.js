const {Router}=require("express")
const userRoute=Router()
const {register,login,logout,userGet,userUpdate,userDelete}=require("../controllers/user.controller")


userRoute.post("/register",register)
userRoute.post("/login",login)






module.exports={userRoute}