const {Router}=require("express")
const userRoute=Router()
const {verify}=require("../middlewares/VerifyRole.middleware")
const {auth}=require("../middlewares/auth.middleware")
const {register,login,logout,userGet,userUpdate,userDelete}=require("../controllers/user.controller")


userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.post("/logout",auth,logout)
userRoute.get("/get",auth,verify(["User","Moderator"]),userGet)
userRoute.patch("/update",auth,verify(["User","Moderator"]),userUpdate)
userRoute.delete("/delete",auth,verify(["User","Moderator"]),userDelete)






module.exports={userRoute}