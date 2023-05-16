const mongoose=require("mongoose")

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      authorID:{type:String,required:true}
  }, {
    versionKey : false,
    timestamps :true
});

const BlogModel=mongoose.model("BlogPost",blogPostSchema)

module.exports={BlogModel}