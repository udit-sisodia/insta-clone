const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const likeModel=require("../models/like.model")



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

async function likePostController(req,res){
    const username=req.user.username
    const postId=req.params.postId

    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    
    const existingLike = await likeModel.findOne({
        post: postId,
        user: username
    })

    if(existingLike){
        return res.status(400).json({
            message:"already liked"
        })
    }

    const newLike = await likeModel.create({
        post: postId,
        user: username
    })


    return res.status(201).json({
        message:"post liked successfully",
        like:newLike
    })
    

}

async function getFeedController(req,res){
    const user=req.user
    const posts =await  Promise.all((await postModel.find().populate("user").lean())
    .map(async(post)=>{
        const isLiked=await likeModel.findOne({
            post: post._id,
            user: user.username})

            post.isLiked=!!isLiked

            return post
    }))

    return res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}


module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController,
    likePostController,
    getFeedController
}