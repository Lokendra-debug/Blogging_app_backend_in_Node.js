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
    
}

const blogGetOne=async(req,res)=>{

}


const blogUpdate=async(req,res)=>{

}

const blogDelete=async(req,res)=>{

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