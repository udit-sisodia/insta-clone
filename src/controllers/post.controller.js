const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")



const client = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KIT
})

async function createPostController(req, res) {

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test.jpg",
        folder:"cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "post created succesfully",
        post
    })
}

async function getAllPostsController(req,res){
   
    const userId=req.user.id

    const posts=await postModel.find({user:userId})

    return res.status(200).json({
        message:"post fetched succesfully",
        posts
    })
}

async function getPostDetailsController(req,res){
   
    const userId=req.user.id
    const postId=req.params.postId

    const posts=await postModel.findById(postId)
    if(!posts){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser=posts.user.toString() === userId
    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden access"
        })
    }

    return res.status(200).json({
        message:"post fetched sucessfully",
        posts
    })
}


module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController
}