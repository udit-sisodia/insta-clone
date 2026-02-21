const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followController(req, res) {
    const followerId = req.user.id
    const followingId = req.params.id

    if (followerId === followingId) {
        return res.status(400).json({
            message: "you cant follow yourself"
        })
    }

    const isUserExists = await userModel.findOne({ _id: followingId })
    if (!isUserExists) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isAlreadyFollowed = await followModel.findOne({ follower: followerId, followee: followingId })
    if (isAlreadyFollowed) {
        return res.status(400).json({
            message: "you already follow this user"
        })
    }

    const follows = await followModel.create({
        follower: followerId,
        followee: followingId
    })

    res.status(201).json({
        message: `you followed ${isUserExists.username} successfully`,
        follows
    })
}

async function unfollowController(req, res) {
    const followerId = req.user.id
    const followingId = req.params.id

    if (followerId === followingId) {
        return res.status(400).json({
            message: "you cant unfollow yourself"
        })
    }

    const isUserFollowing=await followModel.findOne({ follower: followerId, followee: followingId })
    if (!isUserFollowing) {
        return res.status(400).json({
            message: "you dont follow this user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(201).json({
        message: "unfollowed succesfully",
    })
}


module.exports = {
    followController,
    unfollowController
}