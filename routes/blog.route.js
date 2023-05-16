const {Router}=require("express")
const blogRoute=Router()
const {auth}=require("../middlewares/auth.middleware")
const{blogAdd,blogGet,blogGetOne,blogUpdate,blogDelete}=require("../controllers/blog.controller")

blogRoute.post("/add",auth,blogAdd)
blogRoute.get("/get",auth,blogGet)
blogRoute.get("/get/:todoID",auth,blogGetOne)
blogRoute.patch("/update/:todoID",auth,blogUpdate)
blogRoute.delete("/delete/:todoID",auth,blogDelete)

module.exports={blogRoute}