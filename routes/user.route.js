const {Router}=require("express")
const userRoute=Router()
const {auth}=require("../middlewares/auth.middleware")
const {register,login,logout,userGet,userUpdate,userDelete}=require("../controllers/user.controller")


userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/logout",auth,logout)
userRoute.get("/get",auth,userGet)
userRoute.patch("/update",auth,userUpdate)
userRoute.delete("/delete",auth,userDelete)






module.exports={userRoute}