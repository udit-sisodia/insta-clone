const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser=require("../middlewares/auth.middleware")

/* 
 @route /api/posts  [protected]
 @desc this route is for creating a post with an image and caption. the image will be uploaded to cloudinary and the url will be saved in the database.
*/
postRouter.post("/", upload.single("image"),identifyUser, postController.createPostController)

/* 
@route GET /api/posts   [Protected]
@desc this route is to get all posts of that user
*/

postRouter.get("/", identifyUser,postController.getAllPostsController)

/* 
@route GET /api/posts/details/:postId
@desc return an detail about specific post with the id .also check whether the post belongs to the user that request comes from. 
*/

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)


module.exports = postRouter