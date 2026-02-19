const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

/* 
Post /api/posts  [protected]
-req.body={caption,image-file}
*/
postRouter.post("/", upload.single("image"), postController.createPostController)

/* 
GET /api/posts   [Protected]
*/

postRouter.get("/", postController.getAllPostsController)

/* 
GET /api/posts/details/:postId
-return an detail about specific post with the id .also check whether the post belongs to the user that request comes from 
*/

postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = postRouter