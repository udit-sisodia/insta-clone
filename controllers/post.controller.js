const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const client = new ImageKit({
    privatekey: process.env.IMAGEKIT_PRIVATE_KIT
})

async function createPostController(req, res) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "you are not authorized to create a post"
        })
    }

   try{
     var decoded = jwt.verify(token, process.env.JWT_SECRET)
   }catch(err){
    return res.status(401).json({
        message:"you are not authorized to create a post"
    })
   }
    // console.log(decoded) 

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test.jpg",
        folder:"cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })
    res.status(201).json({
        message: "post created succesfully",
        post
    })
}

async function getAllPostsController(req,res){
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unautharised acess"
        })
    }

    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Token not valid"
        })
    }

    const userId=decoded.id

    const posts=await postModel.find({user:userId})

    return res.status(200).json({
        message:"post fetched succesfully",
        posts
    })
}

async function getPostDetailsController(req,res){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unautharized acess"
        })
    }

    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"token is invalid"
        })
    }

    const userId=decoded.id
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