const {BlogModel}=require("../models/blog.model")

const blogAdd=async(req,res)=>{
    const {title,content,authorID}=req.body;
    try {
        const blog=new BlogModel({title,content,authorID});
        await blog.save();
        return res.status(200).send(blog)
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

const blogGet=async(req,res)=>{
    const user=req.body.authorID;
    try {
        const data=await BlogModel.find({authorID:user})
        console.log(data)
        return res.status(200).send(data)

    } catch (error) {
        res.status(400).send({error:error.message});
    }
    
}

const blogGetOne=async(req,res)=>{
    const todoID=req.params.todoID
    try {
        const data=await BlogModel.findById({_id:todoID})

        return res.status(200).send(data)

    } catch (error) {
        res.status(400).send({error:error.message});
    }
}


const blogUpdate=async(req,res)=>{
    const todoID=req.params.todoID
    const payload=req.body;
    try {
        const data=await BlogModel.findByIdAndUpdate({_id:todoID},payload)
        return res.status(200).send(data)
    } catch (error) {
        res.status(400).send({error:error.message});
    }

}

const blogDelete=async(req,res)=>{
    const todoID=req.params.todoID
    try {
        const data=await BlogModel.findByIdAndDelete({_id:todoID})
        return res.status(200).send(`User with user id ${todoID} has been deleted from the database`)
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

const blogGetAll=async(req,res)=>{
    try {
        let allBlogs=await BlogModel.find()
        return res.status(200).send(allBlogs)
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}


module.exports={blogAdd,blogGet,blogGetOne,blogGetAll,blogUpdate,blogDelete}