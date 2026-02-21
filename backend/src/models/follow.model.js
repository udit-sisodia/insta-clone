const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Follower is Required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Followee is required"]
    },
     status:{
            type:String,
            default:"pending",
            enum:["pending","approved","rejected"]
        }

},{timestamps: true})

followSchema.index({follower:1,followee:1},{unique:true})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel