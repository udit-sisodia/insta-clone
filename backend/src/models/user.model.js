const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already existed"],
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true, "email already existed"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select:false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/fpttn101t/social-network-default-profile-picture-avatar-icon-vector-57120632.webp?updatedAt=1772134770218"
    }
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel