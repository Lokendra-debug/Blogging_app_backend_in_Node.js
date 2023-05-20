const {Router}=require("express")
const blogRoute=Router()
const {verify}=require("../middlewares/VerifyRole.middleware")
const {auth}=require("../middlewares/auth.middleware")
const{blogAdd,blogGet,blogGetOne,blogUpdate,blogDelete,blogGetAll}=require("../controllers/blog.controller")

blogRoute.post("/add",auth,verify(["User","Moderator"]),blogAdd)
blogRoute.get("/get",auth,verify(["User","Moderator"]),blogGet)
blogRoute.get("/get/all",auth,verify(["User","Moderator"]),blogGetAll)
blogRoute.get("/get/:todoID",auth,verify(["User","Moderator"]),blogGetOne)
blogRoute.patch("/update/:todoID",auth,verify(["User","Moderator"]),blogUpdate)
blogRoute.delete("/delete/:todoID",auth,verify(["User","Moderator"]),blogDelete)

module.exports={blogRoute}