const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser=require("../middlewares/auth.middleware")

/* 
Post /api/posts  [protected]
-req.body={caption,image-file}
*/
postRouter.post("/", upload.single("image"),identifyUser, postController.createPostController)

/* 
GET /api/posts   [Protected]
-created this to get all posts of that user
*/

postRouter.get("/", identifyUser,postController.getAllPostsController)

/* 
GET /api/posts/details/:postId
-return an detail about specific post with the id .also check whether the post belongs to the user that request comes from 
*/

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

/* 
POST /api/posts/follow/:id
-created a api to follow a person
*/

postRouter.post("/follow/:id",identifyUser,postController.followController)

/* 
POST /api/posts/unfollow/:id
-created a api to unfollow a person
*/

postRouter.post("/unfollow/:id",identifyUser,postController.unfollowController)

module.exports = postRouter