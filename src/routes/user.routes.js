const express=require("express")
const userRouter=express.Router()
const userController=require("../controllers/user.controller")
const identifyUser=require("../middlewares/auth.middleware")
/* 
@route POST /api/posts/follow/:id
@desc this route is for following a user with the id that is passed in the url. the user that is making the request will be the follower and the user that is being followed will be the followee.
*/

userRouter.post("/follow/:id",identifyUser,userController.followController)

/* 
@route POST /api/posts/unfollow/:id
@desc this route is for unfollowing a user with the id that is passed in the url. 
*/

userRouter.post("/unfollow/:id",identifyUser,userController.unfollowController)


module.exports=userRouter