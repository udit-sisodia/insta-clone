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
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
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

module.exports = {
    createPostController
}