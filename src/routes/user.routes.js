const express=require("express")
const userRouter=express.Router()
const userController=require("../controllers/user.controller")
const identifyUser=require("../middlewares/auth.middleware")
/* 
POST /api/posts/follow/:id
-created a api to follow a person
*/

userRouter.post("/follow/:id",identifyUser,userController.followController)

/* 
POST /api/posts/unfollow/:id
-created a api to unfollow a person
*/

userRouter.post("/unfollow/:id",identifyUser,userController.unfollowController)


module.exports=userRouter